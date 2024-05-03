import React, { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const RoomPage = () => {
    const { roomId } = useParams();
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const myMeeting = async (element) => {
            const appID = 64398912;
            const serverSecret = "b9a40254da061bd1b4d4665d7584d061";
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                appID,
                serverSecret,
                roomId,
                Date.now().toString(),
                " "
            );
            const zc = ZegoUIKitPrebuilt.create(kitToken);
            zc.joinRoom({
                container: element,
                sharedLinks: [
                    {
                        name: 'Copy Link',
                        url: `https://101videocall.vercel.app/room/${roomId}`,
                    }
                ],
                scenario: {
                    mode: ZegoUIKitPrebuilt.OneONoneCall,
                },
                showScreenSharingButton: true,
            });
        };

        myMeeting(containerRef.current);
    }, [roomId]);

    return <div ref={containerRef} />;
};

export default RoomPage;
