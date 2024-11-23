package com.nguyenbinh.backend.dtos;

import java.util.*;

public class VideoSimilarityDto {

    private Long videoId;
    private String videoName;
    private Long similarWords;

    // Constructor
    public VideoSimilarityDto(Long videoId, String videoName, Long similarWords) {
        this.videoId = videoId;
        this.videoName = videoName;
        this.similarWords = similarWords;
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

    public Long getSimilarWords() {
        return similarWords;
    }

    public void setSimilarWords(Long similarWords) {
        this.similarWords = similarWords;
    }
}
