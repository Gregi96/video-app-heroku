import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

type VideoPlayerProps = {
    stream: MediaStream,
    myPeer?: boolean
}

export const VideoPlayer: React.FunctionComponent<VideoPlayerProps> = ({
    stream,
    myPeer
}) => {
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.srcObject = stream
        }
    }, [stream])

    return (
        <Video
            ref={videoRef}
            autoPlay
            muted={myPeer}
        />
    )
}

const Video = styled.video`
    object-fit: cover;
    width: 100%;
`
