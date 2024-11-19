package com.nguyenbinh.backend.entities;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;

@Table(name = "videos")
@Entity
public class Video {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long video_id;

    @ManyToOne
    @JoinColumn(name = "user_id",nullable = false)
    private Users user;

    @Column(name = "video_name",nullable = false, length = 255)
    private String videoName;

    @Column(name = "video_description",nullable = false, length = 500)
    private String videoDescription;

    @Column(name = "video_url",nullable = false, length = 2083)
    private String videoUrl;

    @CreationTimestamp
    @Column(name = "create_date", updatable = false)
    private LocalDate createdDate;

    // Getters and Setters


    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public Long getVideo_id() {
        return video_id;
    }

    public void setVideo_id(Long video_id) {
        this.video_id = video_id;
    }

    public String getVideoName() {
        return videoName;
    }

    public void setVideoName(String videoName) {
        this.videoName = videoName;
    }

    public String getVideoDescription() {
        return videoDescription;
    }

    public void setVideoDescription(String videoDescription) {
        this.videoDescription = videoDescription;
    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }

    public LocalDate getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }

}
