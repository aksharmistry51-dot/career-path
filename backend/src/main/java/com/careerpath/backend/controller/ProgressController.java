package com.careerpath.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.careerpath.backend.model.User;
import com.careerpath.backend.repository.UserRepository;

@RestController
@RequestMapping("/api/progress")
public class ProgressController {

    private final UserRepository userRepository;

    public ProgressController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/add-xp")
    public ResponseEntity<?> addXp(@RequestBody java.util.Map<String, Integer> body, Authentication authentication) {
        User user = getCurrentUser(authentication);
        int xpToAdd = body.getOrDefault("xp", 10);

        int newXp = user.getXp() + xpToAdd;
        int newLevel = user.getLevel();

        // Level up logic: every 300 XP = 1 level
        int xpNeededForNextLevel = newLevel * 300;
        if (newXp >= xpNeededForNextLevel) {
            newLevel++;
        }

        user.setXp(newXp);
        user.setLevel(newLevel);
        userRepository.save(user);

        return ResponseEntity.ok(user);
    }

    @PostMapping("/update-streak")
    public ResponseEntity<?> updateStreak(Authentication authentication) {
        User user = getCurrentUser(authentication);

        int newStreak = user.getCurrentStreak() + 1;
        user.setCurrentStreak(newStreak);

        if (newStreak > user.getBestStreak()) {
            user.setBestStreak(newStreak);
        }

        userRepository.save(user);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/reset-streak")
    public ResponseEntity<?> resetStreak(Authentication authentication) {
        User user = getCurrentUser(authentication);
        user.setCurrentStreak(0);
        userRepository.save(user);
        return ResponseEntity.ok(user);
    }

    private User getCurrentUser(Authentication authentication) {
        String username = authentication.getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}