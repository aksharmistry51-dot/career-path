package com.careerpath.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.careerpath.backend.model.Achievement;
import com.careerpath.backend.model.User;
import com.careerpath.backend.repository.AchievementRepository;
import com.careerpath.backend.repository.UserRepository;

@RestController
@RequestMapping("/api/achievements")
public class AchievementController {

    private final AchievementRepository achievementRepository;
    private final UserRepository userRepository;

    public AchievementController(AchievementRepository achievementRepository, UserRepository userRepository) {
        this.achievementRepository = achievementRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<?> getAchievements(Authentication authentication) {
        User user = getCurrentUser(authentication);
        List<Achievement> achievements = achievementRepository.findByUserId(user.getId());
        return ResponseEntity.ok(achievements);
    }

    @PostMapping("/unlock")
    public ResponseEntity<?> unlockAchievement(@RequestBody Map<String, String> body, Authentication authentication) {
        User user = getCurrentUser(authentication);

        Achievement achievement = new Achievement();
        achievement.setUser(user);
        achievement.setAchievementName(body.get("name"));

        achievementRepository.save(achievement);
        return ResponseEntity.ok(achievement);
    }

    private User getCurrentUser(Authentication authentication) {
        String username = authentication.getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}