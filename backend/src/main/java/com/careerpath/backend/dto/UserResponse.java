package com.careerpath.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    private Long id;
    private String username;
    private String selectedPath;
    private Integer level;
    private Integer xp;
    private Integer currentStreak;
    private Integer bestStreak;
}