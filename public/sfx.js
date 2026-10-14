/* Tiny synthesised sound effects (no audio files). KR.sfx.play(name) */
(function(){
  var ctx=null,muted=false;
  try{muted=localStorage.getItem('kr-sound')==='off'}catch(e){}
  function ac(){if(!ctx){var A=window.AudioContext||window.webkitAudioContext;if(!A)return null;ctx=new A()}if(ctx.state==='suspended')ctx.resume();return ctx}
  function tone(f,t,dur,type,vol,slide){var c=ac();if(!c||muted)return;var o=c.createOscillator(),g=c.createGain();o.type=type||'sine';o.frequency.setValueAtTime(f,c.currentTime+t);if(slide)o.frequency.exponentialRampToValueAtTime(slide,c.currentTime+t+dur);g.gain.setValueAtTime(0,c.currentTime+t);g.gain.linearRampToValueAtTime(vol||.08,c.currentTime+t+.006);g.gain.exponentialRampToValueAtTime(.0001,c.currentTime+t+dur);o.connect(g).connect(c.destination);o.start(c.currentTime+t);o.stop(c.currentTime+t+dur+.02)}
  function noise(t,dur,vol){var c=ac();if(!c||muted)return;var n=c.sampleRate*dur,b=c.createBuffer(1,n,c.sampleRate),d=b.getChannelData(0);for(var i=0;i<n;i++)d[i]=(Math.random()*2-1)*(1-i/n);var s=c.createBufferSource(),g=c.createGain(),f=c.createBiquadFilter();f.type='bandpass';f.frequency.value=1800;s.buffer=b;g.gain.value=vol||.12;s.connect(f).connect(g).connect(c.destination);s.start(c.currentTime+t)}
  var S={
    hover:function(){tone(1600,0,.035,'sine',.025)},
    click:function(){tone(520,0,.06,'triangle',.07);tone(1040,.02,.05,'sine',.04)},
    toggle:function(){tone(400,0,.08,'sine',.06,760)},
    jump:function(){tone(330,0,.12,'square',.05,660)},
    bonus:function(){tone(660,0,.09,'triangle',.07);tone(880,.08,.09,'triangle',.07);tone(1320,.16,.14,'triangle',.08)},
    break:function(){noise(0,.14,.14);tone(180,0,.12,'sawtooth',.05,80)},
    over:function(){tone(440,0,.18,'triangle',.08,330);tone(330,.18,.2,'triangle',.08,220);tone(220,.38,.4,'triangle',.08,110)},
    record:function(){[523,659,784,1047].forEach(function(f,i){tone(f,i*.09,.16,'triangle',.08)})}
  };
  window.KR=window.KR||{};
  window.KR.sfx={play:function(n){try{S[n]&&S[n]()}catch(e){}},mute:function(m){muted=!!m;try{localStorage.setItem('kr-sound',m?'off':'on')}catch(e){}},isMuted:function(){return muted}};
  /* UI sounds on the site: buttons, links in nav/cards */
  document.addEventListener('click',function(e){var el=e.target.closest&&e.target.closest('a,button');if(!el||el.dataset.silent!=null)return;S.click()},true);
  document.addEventListener('mouseover',function(e){var el=e.target.closest&&e.target.closest('.btn,.nav a.l,.door,.pc,.ic');if(!el||el._h)return;el._h=1;setTimeout(function(){el._h=0},200);S.hover()},true);
})();
