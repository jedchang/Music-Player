(function(Vue) {
  new Vue({
    el: '#app',
    data: {
      albums: [
        {
          id: 1,
          albumName: 'Gravity',
          artist: 'Bullet For My Valentine',
          coverUrl: 'images/thumb-cover-1.jpg',
          bgUrl: 'images/bg-cover-1.jpg',
          song: this.songs
        },
        {
          id: 2,
          albumName: 'The Good Man',
          artist: 'Ne-Yo',
          coverUrl: 'images/thumb-cover-2.jpg',
          bgUrl: 'images/bg-cover-2.jpg',
          song: this.songs
        },
        {
          id: 3,
          albumName: 'Palo Santo',
          artist: 'Years & Years',
          coverUrl: 'images/thumb-cover-3.jpg',
          bgUrl: 'images/bg-cover-3.jpg'
        },
        {
          id: 4,
          albumName: 'Odyssey',
          artist: 'Take That',
          coverUrl: 'images/thumb-cover-4.jpg',
          bgUrl: 'images/bg-cover-4.jpg'
        },
        {
          id: 5,
          albumName: 'QUEEN',
          artist: 'Nicki Minaj',
          coverUrl: 'images/thumb-cover-5.jpg',
          bgUrl: 'images/bg-cover-5.jpg'
        },
        {
          id: 6,
          albumName: 'KAMIKAZE',
          artist: 'EMINEM',
          coverUrl: 'images/thumb-cover-6.jpg',
          bgUrl: 'images/bg-cover-6.jpg'
        },
        {
          id: 7,
          albumName: 'Bloom',
          artist: 'Troye Sivan',
          coverUrl: 'images/thumb-cover-7.jpg',
          bgUrl: 'images/bg-cover-7.jpg'
        },
        {
          id: 8,
          albumName: 'Sweetener',
          artist: 'Ariana Grande',
          coverUrl: 'images/thumb-cover-8.jpg',
          bgUrl: 'images/bg-cover-8.jpg'
        }
      ],
      songs: [
        {
          id: 1,
          songName: 'Ice Cream',
          timeSeconds: '02:02',
          musicUrl: 'audio/Ice_Cream.mp3'
        },
        {
          id: 2,
          songName: 'Bongo Madness',
          timeSeconds: '03:09',
          musicUrl: 'audio/Bongo_Madness.mp3'
        },
        {
          id: 3,
          songName: 'February',
          timeSeconds: '01:36',
          musicUrl: 'audio/February.mp3'
        },
        {
          id: 4,
          songName: 'Brain Trust',
          timeSeconds: '01:45',
          musicUrl: 'audio/Brain_Trust.mp3'
        },
        {
          id: 5,
          songName: 'Metamorphosis',
          timeSeconds: '02:50',
          musicUrl: 'audio/Metamorphosis.mp3'
        },
        {
          id: 6,
          songName: 'My Town Yo Town',
          timeSeconds: '01:50',
          musicUrl: 'audio/My_Town_Yo_Town.mp3'
        },
        {
          id: 7,
          songName: 'Palmtrees',
          timeSeconds: '02:43',
          musicUrl: 'audio/Palmtrees.mp3'
        },
        {
          id: 8,
          songName: 'Russian Dance',
          timeSeconds: '02:24',
          musicUrl: 'audio/Russian_Dance.mp3'
        }
      ],
      currentAlbum: {
        id: 1,
        albumName: 'Gravity',
        artist: 'Bullet For My Valentine',
        coverUrl: 'images/thumb-cover-1.jpg',
        bgUrl: 'images/bg-cover-1.jpg'
      },
      currentSong: {
        id: '',
        songName: '',
        timeSeconds: undefined,
        musicUrl: ''
      },
      isCurrent: undefined,
      isActiveIdx: undefined,
      isPlaying: false,
      isLoaded: false,
      audioPlayer: undefined,
      isCover: 'images/thumb-cover-1.jpg',
      isAlbum: '',
      isSong: '',
      showClass: 'show',

      durationSeconds: 0,
      currentSeconds: 0,
      progressPercentageValue: '0%',

      allDurationSeconds: []
    },
    mounted() {
      this.audioPlayer = document.querySelector('#music');
      this.init();
    },
    methods: {
      init() {
        this.audioPlayer.addEventListener('loadeddata', this.load);
        this.audioPlayer.addEventListener('timeupdate', this.updateTimer);
        this.audioPlayer.addEventListener('pause', () => {
          this.isPlaying = false;
        });
        this.audioPlayer.addEventListener('play', () => {
          this.isPlaying = true;
        });
      },
      stop() {
        this.audioPlayer.currentTime = 0;
      },
      // play() {
      //   this.audioPlayer.src = this.currentSong.musicUrl;
      //   this.audioPlayer.play();
      // },
      playCurrentSong() {
        this.audioPlayer.play();
        this.isPlaying = true;
      },
      pause() {
        this.audioPlayer.pause();
        this.isPlaying = false;
      },
      updateTimer() {
        this.currentSeconds = parseInt(this.audioPlayer.currentTime);
        this.progressPercentageValue = ((this.currentSeconds / parseInt(this.audioPlayer.duration)) * 100 || 0) + '%';
      },
      load() {
        if (this.isSong === '') return;
        this.isLoaded = true;
        this.durationSeconds = parseInt(this.audioPlayer.duration);
      },
      formatTime(secs) {
        var minutes = Math.floor(secs / 60) || 0;
        var seconds = Math.floor(secs - minutes * 60) || 0;
        return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
      },
      selectAlbum() {
        this.isPlaying = false;
        let album = this.currentAlbum.albumName;
        this.isAlbum = album;
        this.isSong = '';
      },
      selectSong() {
        this.isPlaying = false;
        let song = this.currentSong.songName;
        this.isSong = song;
      },
      selectCover() {
        this.isPlaying = false;
        let cover = this.currentAlbum.coverUrl;
        this.isCover = cover;
      },
      changeSong(song, index) {
        this.isPlaying = false;
        this.isActiveIdx = index;
        this.audioPlayer.src = this.currentSong.musicUrl;
        this.setCurrentSong(song);
        this.selectSong();
      },
      changeAlbum(album, index) {
        this.isPlaying = false;
        this.isCurrent = index;
        this.setCurrentAlbum(album);
        this.selectAlbum();
        this.selectCover();
      },
      setCurrentAlbum(album) {
        this.currentAlbum.id = album.id;
        this.currentAlbum.albumName = album.albumName;
        this.currentAlbum.artist = album.artist;
        this.currentAlbum.coverUrl = album.coverUrl;
        this.currentAlbum.bgUrl = album.bgUrl;
      },
      setCurrentSong(song) {
        this.currentSong.id = song.id;
        this.currentSong.songName = song.songName;
        this.currentSong.musicUrl = song.musicUrl;
      },
      albumList() {
        $('.albums')
          .css({
            opacity: 1,
            display: 'none'
          })
          .hide()
          .animate({
            opacity: 0
          });
        $('.playlists')
          .css({
            opacity: 0,
            display: 'block'
          })
          .show()
          .animate({
            opacity: 1
          });
      },
      enterAlbum() {
        $('.albums')
          .css({
            opacity: 0,
            display: 'block'
          })
          .show()
          .animate({
            opacity: 1
          });
        $('.playlists')
          .css({
            opacity: 1,
            display: 'none'
          })
          .hide()
          .animate({
            opacity: 0
          });
      }
    },

    computed: {
      currentPlayedTime() {
        return this.formatTime(this.currentSeconds);
      },
      duration() {
        return this.formatTime(this.durationSeconds);
      },
      progressPercentage() {
        return parseInt((this.currentSeconds / this.durationSeconds) * 100);
      }
    }
  });
})(Vue);
