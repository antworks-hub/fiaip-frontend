<template>
  <div class="video-player-wrapper">
    <iframe
      width="100%"
      height="100%"
      :src="fullVideoUrl"
      title="Video"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />
  </div>
</template>

<script>
export default {
  name: 'CustomVideoPlayer',

  props: {
    videoUrl: {
      type: String,
      default: null
    }
  },

  data () {
    return {
      isEnded: false
    }
  },

  computed: {
    fullVideoUrl () {
      return this.videoUrl + '?rel=0'
    }
  }
}
</script>
