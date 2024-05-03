import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const RoomPage = () => {
    const { roomId } = useParams();
    const containerRef = useRef(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const joinRoom = async (element) => {
            try {
                const appID = 64398912;
                const serverSecret = "b9a40254da061bd1b4d4665d7584d061";
                const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                    appID,
                    serverSecret,
                    roomId,
                    Date.now().toString(),
                    "shamim"
                );
                const zc = ZegoUIKitPrebuilt.create(kitToken);
                await zc.joinRoom({
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
            } catch (error) {
                setError(error.message);
            }
        };

        joinRoom(containerRef.current);
    }, [roomId]);

    return (
        <div>
            {error && <p>{error}</p>}
            <div ref={containerRef} />
        </div>
    );
};

export default RoomPage;
