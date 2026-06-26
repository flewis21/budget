let againCap = null;
let allMatchesAvailable = [];
const localSuggestionsCache = {};
let rndList = [
  "UU6DOFpA9UCTgNwJiVX1IOpQ",
  "PL-KQSIBx-Icaao3EaHRz0m2P39PwypbnH",
  "PL-KQSIBx-IcaSkA9AdvIwkVVLl6F52LP-",
  "PL-KQSIBx-IcauCgXsM-DWDzGFXgJmZiSS",
  "PL-KQSIBx-Icb3a7aA78VNtQs8f2YBpTY6",
  "PL-KQSIBx-Icb63tQzYzMvbrLXrAvF4Z2b",
  "PL-KQSIBx-IcbI8gQVdlA6IFckuJ1fnkgM",
  "PL-KQSIBx-IcY1MxHJ6O_CCK5Nche7UBVd",
  "PL-KQSIBx-IcYIitriWRZ2caFI8ST-0Oil",
  "PL-KQSIBx-IcYddyYBPVasGjqtLLSHqlUX",
  "PL-KQSIBx-IcYFwEWIQAbL8YPrDnBv7wTU",
  "PL-KQSIBx-IcZaVi2VJ5TYwAOC4VYfKPrE",
  "PL-KQSIBx-IcZlVBWBx9Vm7k7aT9fLZDbH",
  "PL-KQSIBx-IcZh-CSTeWs-iRF4XrvzQwDh",
  "PL-KQSIBx-IcZHEQcLV7u4dK0_e93q8XZg",
  "PL-KQSIBx-IcZJqfk_sAI3FRSK60chqPSq",
  "PL-KQSIBx-IcZFVRDV9sQ_7Y-Scmyh7YG2",
  "PL-KQSIBx-IcZyrPGYJGEndWryKDTzxkaU",
  "PL-KQSIBx-IcZUxla8KuKBn5JJh9L9RDwu",
  "PL-KQSIBx-IcZZ07SBW_YiHMmvlned1cwG",
];
localSuggestionsCache["allMatches"] = rndList;
console.log("all matches length greater than intents: ");
console.log(
  allMatchesAvailable.length < localSuggestionsCache["allMatches"].length,
);
while (
  allMatchesAvailable.length !== localSuggestionsCache["allMatches"].length
) {
  allMatchesAvailable = localSuggestionsCache["allMatches"].sort((a, b) => {
    let i = Math.random();
    let tSorted = a;
    // console.log(againCap + ": tSorted = " + tSorted);
    let zSorted = b;
    // console.log(againCap + ": zSorted = " + zSorted);
    if (i < 0.3) {
      let matchA = zSorted.toLowerCase().localeCompare(tSorted.toLowerCase());
      if (matchA > -1) {
        // console.log(againCap + ": matchA = " + matchA);
        return zSorted;
      }
    } else {
      if (i > 0.3 && i < 0.5) {
        let matchB = tSorted.toLowerCase().localeCompare(zSorted.toLowerCase());
        if (matchB === -1) {
          // console.log(againCap + ": matchB = " + matchB);
          return tSorted;
        }
      } else {
        if (i > 0.5 && i < 0.8) {
          // console.log(againCap + ": matchC = " + zSorted);
          return zSorted;
        } else {
          if (i > 0.8) {
            // console.log(againCap + ": matchD = " + tSorted);
            return tSorted;
          }
        }
      }
    }
  });
}
function myPlay() {
  let list = null;
  list =
    allMatchesAvailable[
      Math.floor(Math.random() * Math.floor(allMatchesAvailable.length))
    ];
  return list;
}
if (!againCap) {
  localStorage.setItem("ytSearch", myPlay());
  againCap = localStorage.getItem("ytSearch");
}
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
      list: againCap,
    },
    events: { onReady: onPlayerReady, onStateChange: onPlayerStateChange },
  });
  function onPlayerReady(event) {
    setShuffle();
    nextVideo();
  }
  // $(".user-icon").click(function (event) {
  //   let confirmation = window.confirm(
  //     "Opening a NEW youtube playList. Click OK to continue. Or Click CANCEL",
  //   );
  //   let ifPlayerDisplay = document.getElementById("iframePlayer");
  //   if (confirmation) {
  //     if (ifPlayerDisplay.style.display === "none") {
  //       ifPlayerDisplay.style.display = "block";
  //       playVideo();
  //     } else {
  //       loadPlaylist();
  //       setShuffle();
  //       nextVideo();
  //       playVideo();
  //     }
  //   } else {
  //     // stopVideo();
  //     console.log(ifPlayerDisplay);
  //     ifPlayerDisplay.style.display = "none";
  //   }
  // });

  // 5. The API calls this function when the player's state changes.
  //    The function indicates that when playing a video (state=1),
  //    the player should play for six seconds and then stop.

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
      playVideo();
    } else if (event.data == YT.PlayerState.ENDED) {
      changeBorderColor(event.data);
      loadPlaylist();
      setShuffle();
      playVideo();
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
      color = "#37474F";
    } // unstarted = gray
    else if (playerStatus == 0) {
      color = "#FFFF00";
    } // ended = yellow
    else if (playerStatus == 1) {
      color = "#33691E";
    } // playing = green
    else if (playerStatus == 2) {
      color = "#DD2C00";
    } // paused = red
    else if (playerStatus == 3) {
      color = "#AA00FF";
    } // buffering = purple
    else if (playerStatus == 5) {
      color = "#FF6DOO";
    } // video cued = orange

    if (color) {
      document.getElementById("iframePlayer").style.borderColor = color;
    }
  }

  function onPlayerError() {
    if (iframePlayer && iframePlayer.destroy) {
      iframePlayer.destroy;
      // onYouTubeIframeAPIReady();
    }
  }
  function stopVideo() {
    if (iframePlayer && iframePlayer.stopVideo) {
      iframePlayer.stopVideo();
    }
  }

  function getVideoUrl() {
    if (iframePlayer && iframePlayer.getVideoUrl) {
      iframePlayer.getVideoUrl();
    }
  }

  function setLoop() {
    if (iframePlayer && iframePlayer.setLoop) {
      iframePlayer.setLoop(true);
    }
  }

  function setShuffle() {
    if (iframePlayer && iframePlayer.setShuffle) {
      iframePlayer.setShuffle(true);
    }
  }

  function playVideo() {
    if (iframePlayer && iframePlayer.playVideo) {
      iframePlayer.playVideo();
    }
  }
  function nextVideo() {
    if (iframePlayer && iframePlayer.nextVideo) {
      iframePlayer.nextVideo();
    }
  }
  function muteVideo() {
    if (iframePlayer && iframePlayer.mute) {
      iframePlayer.mute();
    }
  }
  function unmuteVideo() {
    if (iframePlayer && iframePlayer.unMute) {
      iframePlayer.unMute();
    }
  }
  function setVolume(vol) {
    if (iframePlayer && iframePlayer.setVolume) {
      iframePlayer.setVolume(vol);
    }
  }
  function pauseVideo() {
    if (iframePlayer && iframePlayer.pauseVideo) {
      iframePlayer.pauseVideo();
    }
  }
  function loadPlaylist() {
    if (iframePlayer && iframePlayer.loadPlaylist) {
      iframePlayer.loadPlaylist({
        listType: "playlist",
        list: allMatchesAvailable[
          Math.floor(Math.random() * Math.floor(allMatchesAvailable.length))
        ],
        index: 0,
        startSeconds: 0,
      });
    }
  }
}
const scriptURL =
  "https://script.google.com/macros/s/AKfycbws1AHgKrX82q9EOpS4fJn8l4VjkeANlnIK5g9T6q5wdKpI6068ah2Ryve4U4y0cXe13w/exec";

let hError = document.getElementById("data-display");
let elem = document.getElementById("myBar");
let i = 0;

async function fetchData() {
  let confirmation = window.confirm("Request data?");

  if (confirmation) {
    try {
      const response = await fetch(scriptURL + "?action=getData");
      if (!response.ok) {
        const errorText = await response.text();
        const errorTextDiv = document.getElementById("artiicleIndexError");
        errorTextDiv.innerHTML = "";
        const div = document.createElement("div");
        div.textContent = suggestion;
        div.classList.add("card-panel", "receipt", "btn-large");
        div.addEventListener("click", () => {
          response = fetch(scriptURL + "?action=getData");
        });
        errorTextDiv.appendChild(btn);
        try {
          errorTextDiv.innerHTML = "";
        } catch {
          throw new Error(
            `HTTP error! status: ${response.status}, ${errorText}`,
          );
        }
      }

      let responseData;
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        responseData = await response.json();
        console.log(responseData);
      } else if (contentType && contentType.includes("text/plain")) {
        responseData = await response.text();
        console.log(responseData);
      } else {
        responseData = await response.text();
        console.log(responseData);
      }
      if (responseData?.pL?.type === "html") {
        document.open();
        document.write(responseData?.message?.info); // Wrap in <pre> for formatting
        document.close();
      } else if (
        responseData?.pL?.type === "url" ||
        responseData?.pL?.type === "text"
      ) {
        document.location.href = scriptURL;
      } else if (responseData.message.content.url) {
        document.location.href = responseData.message.content.url;
      } else if (responseData.message.content) {
        document.location.href = scriptURL;
        // document.location.href = responseData.message.content;
      } else if (responseData?.message?.link) {
        document.location.href = scriptURL;
      } else {
        document.getElementById("data-display").textContent = JSON.stringify(
          responseData,
          null,
          2,
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      document.getElementById("data-display").textContent =
        "Error fetching data: " + error.message;
    }
  } else {
    hError.textContent = "No data! Click here to load:";
    return;
  }
}

async function submitForm() {
  const form = document.getElementById("myForm");
  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => (data[key] = value));
  if (!data.name) {
    document.getElementById("form-message").textContent =
      "Error: Name is required";
    return;
  }
  if (!data.email) {
    document.getElementById("form-message").textContent =
      "Error: Email is required";
    return;
  }

  try {
    const response = await fetch(scriptURL + "?action=submitForm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error ${response.status}: ${errorText}`);
    }
    const responseData = await response.json();
    document.getElementById("form-message").textContent = responseData.message;

    if (responseData.success) {
      form.reset();
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    document.getElementById("form-message").textContent =
      `Error: ${error.message}`;
  }
}

fetchData(); // Call on page load
document.addEventListener("DOMContentLoaded", function () {
  if (hError.textContent === String("No data! Click here to load:")) {
    hError.addEventListener("click", function () {
      reFetch();
      function reFetch() {
        hError.textContent = "Loading...";
        fetchData();
      }
    });
    // if (i == 0) {
    //   i = 1;
    //   let width = 1;
    //   let id = setInterval(frame, 10);
    //   function frame() {
    //     if (width >= 100) {
    //       clearInterval(id);
    //       i = 0;
    //     } else {
    //       width++;
    //       elem.style.width = width + "%";
    //     }
    //   }
    // }
    // console.log(event);
  }
});

// let cancelFetch = null;
// hError.addEventListener("mouseover", function () {
//   // cancelRequest();
//   this.textContent = "Error fetching data:";
//   cancelFetch = true;
// });

// function cancelRequest() {
//   hError.textContent = "Error fetching data:";
// }

function move() {
  if (i == 0) {
    i = 1;
    // elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
}

move(); // Call on page load

function serverSide(func, args) {
  return new Promise((resolve, reject) => {
    try {
      resolve(fetch(scriptURL + "?func=runBoilerplate&args=" + [func, args]));
    } catch (error) {
      reject(error);
    }
  });
}
/**
 * VideoStreamer class
 * Streams video from a given source URL using MediaSource API
 */

class VideoStreamer {
  constructor(videoElementId, startShareId, stopShareId) {
    this.videoElement = document.getElementById(videoElementId);
    this.startShare = document.getElementById(startShareId);
    this.stopShare = document.getElementById(stopShareId);
    try {
      if (!(this.videoElement instanceof HTMLVideoElement)) {
        throw new Error("Invalid video element ID");
      }
      this.mediaSource = new MediaSource();
      this.reader - null;
      this.recorder = null;
      this.sourceBuffer = null;
      this.blob = null;
      this.chunks = [];
    } catch (noVideo) {
      console.error("Error processing request:", noVideo);
    }
  }

  async startStream(
    sourceUrl,
    mimeType = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
  ) {
    if (!("MediaSource" in window)) {
      console.error("MediaSource API not supported in this browser.");
      return;
    }

    this.videoElement.src = URL.createObjectURL(this.mediaSource);
    this.videoElement.srcObject = this.mediaSource.addEventListener(
      "sourceopen",
      async () => {
        try {
          this.sourceBuffer = this.mediaSource.addSourceBuffer(mimeType);
          const options = { muteHttpExceptions: true };
          const response = await fetch(sourceUrl, options);

          if (!response.ok)
            throw new Error("HTTP error! Status: " + response.status);
          const videoData = await response.arrayBuffer();

          this.sourceBuffer.addEventListener("updated", () => {
            this.mediaSource.endOfStream();
            this.videoElement
              .play()
              .catch((err) => console.error("Playback error:", err));
          });

          this.sourceBuffer.appendBuffer(videoData);
        } catch (err) {
          console.error("Streaming error:", err);
        }
      },
    );
    this.startShare.addEventListener("click", async (event) => {
      try {
        /** Request permission to capture the screen */
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: { cursor: "always" },
          audio: true, // Optional: capture system audio
        });

        /** Display the captured screen in the video element */
        this.videoElement.srcObject = stream;

        // Start recording
        this.recorder = new MediaRecorder(stream);
        this.recorder.ondataavailable = (e) => this.chunks.push(e.data);
        this.recorder.onstop = saveRecording;
        this.recorder.start();

        event.target.disabled = true;
        this.stopShare.disabled = false;

        /** Handle when user stops sharing */
        this.stopShare.addEventListener("click", (event) => {
          this.recorder.stop();
          stream.getTracks().forEach((track) => track.stop());
          stream.getVideoTracks()[0].addEventListener("ended", () => {
            alert("Screen sharing stopped.");
            this.videoElement.srcObject = null;
          });
          this.startShare.disabled = false;
          event.target.disabled = true;
        });

        function saveRecording() {
          this.blob = new Blob(this.chunks, { type: "video/webm" });
          this.chunks = [];

          this.reader = new FileReader();
          this.reader.onloadend = () => {
            const base64Data = this.reader.result.split(",")[1];
            serverSide("postToDrive", ["screen_share.webm", base64Data]).data;
          };
          this.reader.readAsDataURL(blob);
        }
      } catch (err) {
        console.error("Error starting screen share:", err);
        alert("Screen share failed: " + err.message);
      }
    });
  }
}
const streamer = new VideoStreamer("videoPlayer", "startShare", "stopShare");
streamer.startStream();
