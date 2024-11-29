package com.nguyenbinh.backend.entities;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "video_playlist")
public class VideoPlaylist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "video_playlist_id", nullable = false, updatable = false)
    private Long videoPlaylistId;

    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("playlistId")
    @JoinColumn(name = "playlist_id", referencedColumnName = "playlist_id", nullable = false)
    private Playlist playlist;

    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("videoId")
    @JoinColumn(name = "video_id", referencedColumnName = "video_id", nullable = false)
    private Video video;

    public Long getVideoPlaylistId() {
        return videoPlaylistId;
    }

    public void setVideoPlaylistId(Long videoPlaylistId) {
        this.videoPlaylistId = videoPlaylistId;
    }

    public Playlist getPlaylist() {
        return playlist;
    }

    public void setPlaylist(Playlist playlist) {
        this.playlist = playlist;
    }

    public Video getVideo() {
        return video;
    }

    public void setVideo(Video video) {
        this.video = video;
    }

}