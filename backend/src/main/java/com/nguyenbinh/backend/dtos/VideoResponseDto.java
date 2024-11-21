package com.nguyenbinh.backend.dtos;

import com.nguyenbinh.backend.entities.Video;

public class VideoResponseDto {
    private Long videoId;
    private String title;
    private String url;

    public VideoResponseDto(Long videoId, String title, String url) {
        this.videoId = videoId;
        this.title = title;
        this.url = url;
    }

    public static VideoResponseDto fromVideo(Video video) {
        return new VideoResponseDto(
                video.getVideoId(),
                video.getVideoName(),
                video.getVideoUrl()
        );
    }

    public Long getVideoId() {
        return videoId;
    }
    public String getTitle() {
        return title;
    }
    public String getUrl() {
        return url;
    }

    public void setTitle(java.lang.String title) {
        this.title = title;
    }
    public void setUrl(java.lang.String url) {
        this.url = url;
    }
    public void setVideoId(java.lang.Long videoId) {
        this.videoId = videoId;
    }
}
