import { createVideoElement, onInsertVideoWhenTargetIsVisible } from './videomanager'

const target = document.getElementById('sunmedia')

const videoElm = createVideoElement('https://vod.addevweb.com/sunmedia/demos/v/normal.mp4')

if(target && videoElm) {
    onInsertVideoWhenTargetIsVisible(target, videoElm)
}