import React from "react";
import { useParams } from "react-router-dom";
import {ZegoUIKitPrebuilt} from '@zegocloud/zego-uikit-prebuilt'


const RoomPage = () =>{
    const {roomId} = useParams();

    const myMeeting = async (element) =>{
        const appID = 64398912 ;
        const serverSecret ="b9a40254da061bd1b4d4665d7584d061";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            roomId,
            Date.now().toString(),
            "shamim"
        );
        const zc = ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom({
            container:element,
            sharedLinks:[
                {
                    name: 'Copy Link',
                    url: `http://localhost:5173/room/${roomId}`,
                }
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall,
            },
            showScreenSharingButton : true,
        });
    };



    return <div>
        <div ref={myMeeting} />
    </div>
};

export default RoomPage;