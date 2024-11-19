package com.nguyenbinh.backend.services;

import com.nguyenbinh.backend.entities.Video;
import com.nguyenbinh.backend.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class VideoService {

    @Autowired
    private VideoRepository videoRepository;

    public Video getVideoById(Long id) {
        Optional<Video> video = videoRepository.findById(id);
        return video.orElse(null);
    }

    public Video saveVideo(Video video) {
        return videoRepository.save(video);
    }

}
