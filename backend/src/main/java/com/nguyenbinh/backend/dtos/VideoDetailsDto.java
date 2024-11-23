package com.nguyenbinh.backend.dtos;

import java.util.List;

public class VideoDetailsDto {

    private Long videoId;
    private String videoName;
    private List<VideoSimilarityDto> recommendations;

    // Constructor
    public VideoDetailsDto(Long videoId, String videoName, List<VideoSimilarityDto> recommendations) {
        this.videoId = videoId;
        this.videoName = videoName;
        this.recommendations = recommendations;
    }

    // Getters and Setters
    public Long getVideoId() {
        return videoId;
    }

    public void setVideoId(Long videoId) {
        this.videoId = videoId;
    }

    public String getVideoName() {
        return videoName;
    }

    public void setVideoName(String videoName) {
        this.videoName = videoName;
    }

    public List<VideoSimilarityDto> getRecommendations() {
        return recommendations;
    }

    public void setRecommendations(List<VideoSimilarityDto> recommendations) {
        this.recommendations = recommendations;
    }
}
