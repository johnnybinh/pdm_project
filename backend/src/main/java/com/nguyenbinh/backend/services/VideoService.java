package com.nguyenbinh.backend.services;

import com.nguyenbinh.backend.entities.Video;
import com.nguyenbinh.backend.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.nguyenbinh.backend.entities.Users;
import com.nguyenbinh.backend.dtos.*;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;
import java.lang.*;

@Service
public class VideoService {

    @Autowired
    private VideoRepository videoRepository;

    public Video getVideoById(Long id) {
        Optional<Video> video = videoRepository.findVideoById(id);
        return video.orElse(null);
    }
    
    public VideoDetailsDto getVideoDetails(Long videoId) {
        Video video = videoRepository.findVideoById(videoId).orElseThrow(() -> new RuntimeException("Video not found"));

        // Fetch
        List<Object[]> results = videoRepository.findSimilarVideos(videoId, video.getVideoName());

        List<VideoSimilarityDto> VideoHaveSimilarWords = results.stream()
                .map(row -> new VideoSimilarityDto(
                        ((Number) row[0]).longValue(),  // videoId
                        (String) row[1],               // videoName
                        ((Number) row[2]).longValue()   // similarWords
                ))
                .collect(Collectors.toList());
//        for (Object[] row : results) {
//            System.out.print(row[0] + " " + row[1] + " " + row[2]);
//            System.out.println();
//        }
        List<VideoSimilarityDto> simlarVideos = new ArrayList<>();
        // Process
        for (VideoSimilarityDto x : VideoHaveSimilarWords) {
            if (x.getSimilarWords() > 0) {
                simlarVideos.add(new VideoSimilarityDto(x.getVideoId(), x.getVideoName(), x.getSimilarWords()));
            }
        }
        simlarVideos.sort(Comparator.comparing(VideoSimilarityDto::getSimilarWords).reversed());
        return new VideoDetailsDto(video.getVideoId(), video.getVideoName(), simlarVideos);
    }

    public List<Video> allVideo() {
        return videoRepository.findAllVideos();
    }

    public void saveVideo(Video video) {
        videoRepository.saveVideo(video.getVideoName(), video.getVideoDescription(), video.getVideoUrl(), video.getUser().getUserId());
    }

    public List<Video> searchVideos(String query) {

        return videoRepository.searchVideos(query);

    }
    public List<Video> getVideosByUserId(Long userId) {
        return videoRepository.findAllVideosByUserId(userId);
    }
}