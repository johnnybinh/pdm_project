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
        Video video = videoRepository.findVideoById(videoId)
                .orElseThrow(() -> new RuntimeException("Video not found"));

        List<Object[]> results = videoRepository.findSimilarVideos(videoId, video.getVideoName());

        List<VideoSimilarityDto> videoHaveSimilarWords = results.stream()
                .map(row -> {
                    Long similarVideoId = ((Number) row[0]).longValue();
                    String similarVideoName = (String) row[1];
                    Long similarWords = ((Number) row[2]).longValue();

                    Video similarVideo = videoRepository.findVideoById(similarVideoId)
                            .orElseThrow(() -> new RuntimeException("Similar video not found"));

                    return new VideoSimilarityDto(
                            similarVideo.getVideoId(),
                            similarVideo.getVideoName(),
                            similarVideo.getVideoDescription(),
                            similarVideo.getVideoUrl(),
                            similarVideo.getCreatedDate(),
                            new UserResponseDto(
                                    similarVideo.getUser().getUserId(),
                                    similarVideo.getUser().getEmail(),
                                    similarVideo.getUser().getFullName(),
                                    similarVideo.getUser().getProfilePicture()
                            ),
                            similarWords
                    );
                })
                .collect(Collectors.toList());

        List<VideoSimilarityDto> similarVideos = videoHaveSimilarWords.stream()
                .filter(dto -> dto.getSimilarWords() > 0)
                .sorted(Comparator.comparing(VideoSimilarityDto::getSimilarWords).reversed())
                .collect(Collectors.toList());

        return new VideoDetailsDto(
                video.getVideoId(),
                video.getVideoName(),
                video.getVideoDescription(),
                video.getVideoUrl(),
                video.getCreatedDate(),
                new UserResponseDto(
                        video.getUser().getUserId(),
                        video.getUser().getEmail(),
                        video.getUser().getFullName(),
                        video.getUser().getProfilePicture()
                ),
                similarVideos
        );
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