package com.nguyenbinh.backend.services;

import com.nguyenbinh.backend.entities.Video;
import com.nguyenbinh.backend.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VideoService {

    @Autowired
    private VideoRepository videoRepository;

    public Video getVideoById(String id) {
        return videoRepository.findVideoById(id);
    }
}
