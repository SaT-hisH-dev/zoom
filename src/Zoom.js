import React, { useEffect } from 'react'
import { ZoomMtg } from "@zoomus/websdk";

function Zoom(){
    // const testTool = window.testTool;

const API_KEY = "44PNE-bLTk2sdq_6aJTiKQ";
const API_SECRET = "JMs3na5nDSuXbbKhN6D4vgKJnOcBA8ofDCOP";

    const meetingConfig = {
        apiKey: API_KEY,
        meetingNumber: 9988879900,
        userName:"Vishnu",
        passWord: "A5XfNc",
        leaveUrl: "http://localhost:3001/sample",
        role: parseInt(0, 10),
        userEmail: "vishnu@apptomate.co",
        signature:  "",
      };


    const zoomSetup = () => {
        const signature = ZoomMtg.generateSignature({
            meetingNumber: meetingConfig.meetingNumber,
            apiKey: API_KEY,
            apiSecret: API_SECRET,
            role: meetingConfig.role,
            success: function (res) {
              console.log(res.result);
              meetingConfig.signature = res.result;
              meetingConfig.apiKey = API_KEY;
                // testTool.serialize(meetingConfig);
            //   document.getElementById('copy_link_value').setAttribute('link', joinUrl);
            //   copyToClipboard('copy_link_value');
            },
          });
        //   showZoomDiv()
        ZoomMtg.setZoomJSLib("https://source.zoom.us/2.1.1/lib", "/av");
        ZoomMtg.preLoadWasm();
        ZoomMtg.prepareJssdk();
        beginJoin(meetingConfig.signature);
        
    }
    // const showZoomDiv = () => {
    //     document.getElementById('zmmtg-root').style.display = 'block'
    //   }

    const beginJoin =(signature) =>{
        ZoomMtg.init({
          leaveUrl: meetingConfig.leaveUrl,
          disableCORP: !window.crossOriginIsolated, // default true
          // disablePreview: false, // default false
          success: function () {
            console.log(meetingConfig);
            console.log("signature", signature);
            ZoomMtg.i18n.load(meetingConfig.lang);
            ZoomMtg.i18n.reload(meetingConfig.lang);
            ZoomMtg.join({
              meetingNumber: meetingConfig.meetingNumber,
              userName: meetingConfig.userName,
              signature: signature,
              apiKey: meetingConfig.apiKey,
              userEmail: meetingConfig.userEmail,
              passWord: meetingConfig.passWord,
              success: function (res) {
                console.log("join meeting success");
                console.log("get attendeelist");
                ZoomMtg.getAttendeeslist({});
                ZoomMtg.getCurrentUser({
                  success: function (res) {
                    console.log("success getCurrentUser", res.result.currentUser);
                  },
                });
              },
              error: function (res) {
                console.log(res);
              },
            });
          },
          error: function (res) {
            console.log(res);
          },
        });
      
        ZoomMtg.inMeetingServiceListener('onUserJoin', function (data) {
          console.log('inMeetingServiceListener onUserJoin', data);
        });
      
        ZoomMtg.inMeetingServiceListener('onUserLeave', function (data) {
          console.log('inMeetingServiceListener onUserLeave', data);
        });
      
        ZoomMtg.inMeetingServiceListener('onUserIsInWaitingRoom', function (data) {
          console.log('inMeetingServiceListener onUserIsInWaitingRoom', data);
        });
      
        ZoomMtg.inMeetingServiceListener('onMeetingStatus', function (data) {
          console.log('inMeetingServiceListener onMeetingStatus', data);
        });
        
      }
      console.log("effect");
      
      
    useEffect(() => {
        zoomSetup();
    }, [])
    return <div className="zmmtg-root"></div>
}

export default Zoom;
