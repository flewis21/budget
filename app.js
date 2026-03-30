const tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
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
      autohide: 1,
      playsinline: 1,
      mute: 1,
      modestbranding: 1,
      vq: "hd1080",
      listType: "playlist",
      list: "UU6DOFpA9UCTgNwJiVX1IOpQ",
    },
    events: { onReady: onPlayerReady, onStateChange: onPlayerStateChange },
  });
  function onPlayerReady(event) {
    event.target.playVideo();
  }
  const done = false;
  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
      setTimeout(playVideo); // done
      // = true;
    }
  }
  function stopVideo() {
    iframePlayer.stopVideo();
  }
  function playVideo() {
    iframePlayer.playVideo();
  }
  function nextVideo() {
    iframePlayer.nextVideo();
  }
}
