const tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
let ctr = 0;
let iframePlayer;
function onYouTubeIframeAPIReady() {
  iframePlayer = new YT.Player("iframePlayer", {
    height: "505",
    width: "585",
    //  videoId: 'OTeQee-gxa4',
    playerVars: {
      autoplay: 1,
      loop: 1,
      controls: 0,
      showinfo: 0,
      rel: 0,
      autohide: 1,
      playsinline: 1,
      mute: 0,
      modestbranding: 1,
      vq: "hd1080",
      iv_load_policy: 3,
      cc_load_policy: 1,
      listType: "playlist",
      list: "UU6DOFpA9UCTgNwJiVX1IOpQ",
    },
    events: { onReady: onPlayerReady, onStateChange: onPlayerStateChange },
  });
  function onPlayerReady(event) {
    setShuffle();
    event.target.nextVideo();
  }

  // 5. The API calls this function when the player's state changes.
  //    The function indicates that when playing a video (state=1),
  //    the player should play for six seconds and then stop.
  let done = false;
  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
      changeBorderColor(event.data);
      setLoop();
    } else if (event.data == YT.PlayerState.UNSTARTED) {
      changeBorderColor(event.data);
      event.target.playVideo();
    } else if (event.data == YT.PlayerState.ENDED) {
      changeBorderColor(event.data);
      setShuffle();
      event.target.playVideo();
      setShuffle();
      event.target.nextVideo();
    } else if (event.data == YT.PlayerState.PAUSED) {
      changeBorderColor(event.data);
    } else if (event.data == YT.PlayerState.BUFFERING) {
      changeBorderColor(event.data);
      setShuffle();
    } else if (event.data == YT.PlayerState.VIDEO_CUED) {
      changeBorderColor(event.data);
    }
    done = true;
  }

  function changeBorderColor(playerStatus) {
    let color;

    if (playerStatus == -1) {
      color = "#37474F"
    } // unstarted = gray
    else if (playerStatus == 0) {
      color = "#FFFF00"
    } // ended = yellow
    else if (playerStatus == 1) {
      color = "#33691E"
    } // playing = green
    else if (playerStatus == 2) {
      color = "#DD2C00"
    } // paused = red
    else if (playerStatus == 3) {
      color = "#AA00FF"
    } // buffering = purple
    else if (playerStatus == 5) {
      color = "#FF6DOO"
    } // video cued = orange

    if (color) {
      document.getElementById('iframePlayer').style.borderColor = color
    }
  }
  function stopVideo() {
    iframePlayer.stopVideo();
  }

  function getVideoUrl() {
    player1.getVideoUrl();
  }

  function setLoop() {
    player1.setLoop(true);
  }

  function setShuffle() {
    player1.setShuffle(true);
  }

  function playVideo() {
    iframePlayer.playVideo();
  }
  function nextVideo() {
    iframePlayer.nextVideo();
  }

  function pauseVideo() {
    player1.pauseVideo();
  }

  function onPlayerError() {
    player1.destroy;
    onYouTubeIframeAPIReady();
  }
}
