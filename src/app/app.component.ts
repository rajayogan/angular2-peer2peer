import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  @ViewChild('myvideo') myVideo: any;
  
  title = 'app works!';
  
  targetpeer: any;
  peer: any;
  n = <any>navigator;
  
  ngOnInit() {
    let video = this.myVideo.nativeElement;
    let peerx: any;
    this.n.getUserMedia = (this.n.getUserMedia || this.n.webkitGetUserMedia || this.n.mozGetUserMedia || this.n.msGetUserMedia);
    this.n.getUserMedia({video:true, audio:true}, function(stream) {
    peerx = new SimplePeer ({
      initiator: location.hash === '#init',
      trickle: false,
      stream:stream
    })
    
    peerx.on('signal', function(data) {
      console.log(JSON.stringify(data));
      
      this.targetpeer = data;
    })
    
    peerx.on('data', function(data) {
      console.log('Recieved message:' + data);
    })
    
    peerx.on('stream', function(stream) {
      video.src = URL.createObjectURL(stream);
      video.play();
    })
    
    }, function(err){
    console.log('Failed to get stream', err);
    });
    
    setTimeout(() => {
      this.peer = peerx;
      console.log(this.peer);
    }, 5000);
  }
  
  connect() {
    this.peer.signal(JSON.parse(this.targetpeer));
  }
  
  message() {
    this.peer.send('Hello world');
  }
  
}
