package com.careerpath.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.careerpath.backend.model.Task;
import com.careerpath.backend.model.User;
import com.careerpath.backend.repository.TaskRepository;
import com.careerpath.backend.repository.UserRepository;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskController(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<?> getTasks(Authentication authentication) {
        User user = getCurrentUser(authentication);
        List<Task> tasks = taskRepository.findByUserId(user.getId());
        return ResponseEntity.ok(tasks);
    }

    @PostMapping
    public ResponseEntity<?> createTask(@RequestBody Map<String, Object> body, Authentication authentication) {
        User user = getCurrentUser(authentication);

        Task task = new Task();
        task.setUser(user);
        task.setTitle((String) body.get("title"));
        task.setTopic((String) body.get("topic"));
        task.setDayNumber((Integer) body.get("dayNumber"));
        task.setCompleted(false);

        taskRepository.save(task);
        return ResponseEntity.ok(task);
    }

    @PutMapping("/{id}/toggle")
    public ResponseEntity<?> toggleTask(@PathVariable Long id, Authentication authentication) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setCompleted(!task.getCompleted());
        taskRepository.save(task);

        return ResponseEntity.ok(task);
    }

    private User getCurrentUser(Authentication authentication) {
        String username = authentication.getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
    @GetMapping("/topic-progress")
    public ResponseEntity<?> getTopicProgress(Authentication authentication) {
        User user = getCurrentUser(authentication);
        List<Task> tasks = taskRepository.findByUserId(user.getId());

        Map<String, long[]> topicStats = new java.util.LinkedHashMap<>();
        for (Task t : tasks) {
            String topic = t.getTopic() != null ? t.getTopic() : "General";
            topicStats.putIfAbsent(topic, new long[]{0, 0});
            topicStats.get(topic)[1]++;
            if (Boolean.TRUE.equals(t.getCompleted())) {
                topicStats.get(topic)[0]++;
            }
        }

        List<Map<String, Object>> result = new java.util.ArrayList<>();
        for (Map.Entry<String, long[]> entry : topicStats.entrySet()) {
            long completed = entry.getValue()[0];
            long total = entry.getValue()[1];
            int percent = total > 0 ? (int) ((completed * 100) / total) : 0;
            Map<String, Object> item = new java.util.HashMap<>();
            item.put("topic", entry.getKey());
            item.put("percent", percent);
            result.add(item);
        }

        return ResponseEntity.ok(result);
    }
}