// Image srcs are Cloudinary URLs, e.g.:
// src: 'https://res.cloudinary.com/<your-cloud>/image/upload/v.../filename.jpg'

import {cdn, cdnVideo} from "../../lib/cloudinary.js";

export default {
  slug: 'tv',
  title: "It's The End of the World and My TV Won't Turn Off",
  year: '2025',
  medium: 'Monitors, dirt, 60 minutes of television footage, television remote',
  dimensions: 'Variable',
  venue: '//PIXELMOUTH at La MaMa Galleria, NYC',
  cover: { kind: 'image', src: cdn('q_auto/f_auto/v1777235252/iteotw-cover_dxfjxc.jpg'), ratio: '16/9' },
  summary: 'Distracting yourself at the edge of apocalypse.',
  blocks: [
    { kind: 'lede', text: 'You surf the channels looking for anything to distract yourself from the shockwave growing closer.' },
    {
      kind: 'essay',
      body: [
        <>{'Created for //PIXELMOUTH\'s 2025 Show '}
        <a href="https://pixelmouth.org/eow-1" target="_blank" rel="noreferrer" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>"IT'S THE END OF THE WORLD AND MY EARS ARE BLEEDING AND MY EYES ARE BURNING AND MY MOUTH IS FALLING OUT"</a>
        {', this piece is a compilation of an hour\'s worth of television broadcasts that reference end times and loss, each in their own unique way. ' +
        'From buzzer beaters to televangelists, and reality television send-offs to tragic movie scenes, this piece says that the distraction of media consumption ' +
        'won\'t be of any comfort when the world falls apart. Viewers are welcome to "click through the channels" with a remote control, surfing through premonitions ' +
        'of doom in the hopes of distraction.'}</>
      ],
    },
    {
      kind: 'image-pair',
      images: [
        {
          kind: 'image',
          src: cdn('/q_auto/f_auto/iteotw-gallery3_ap3wa1'),
          caption: 'A Visitor watches as channels change on the television',
        },
        {
          kind: 'image',
          src: cdn('/q_auto/f_auto/iteotw-gallery2_h8ypyk'),
          caption: "Installed alongside Tench Cholnoky's \"it's gone\"",
        },
      ],
    },

    { kind: 'section', heading: "Process" },
    {
      kind: 'essay',
      body: [<>{'This project began with a '}
      <a href="https://www.instagram.com/p/DHbzkeFSo9s/" target="_blank" rel="noreferrer" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>promotional video</a>
      {' for the exhibition: a mash-up of news anchors saying ' +
      'the show\'s title, one word at a time. After discovering '}
      <a href="https://filmot.com/" target="_blank" rel="noreferrer" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Filmot</a>
      {', a tool that searches YouTube ' +
      'videos by subtitle text, I started collecting various clips that I thought would convey a sense ' +
      'of dread and apocalypse when compiled together. What began as a small experiment quickly became ' +
      'an obsession. In the weeks leading up to the exhibition, I gathered more than a hundred clips and' +
      ' proposed a video installation that would function as an environmental backdrop to the show. The ' +
      'PIXELMOUTH team loved the idea and I built out my interactive network in TouchDesigner to handle ' +
      'randomly selecting and transitioning between clips, along with allowing for interaction and channel ' +
      'surfing through the use of an infrared remote. '}</>],
    },
    {
      kind: 'image-pair',
      images: [
        { kind: 'video', src: cdnVideo('q_auto/f_auto/iteotw-video1_fad9oj'), caption: 'Video of Installation', objectPosition: 'center 30%' },
        { kind: 'video', src: cdnVideo('q_auto/f_auto/iteotw-video2_cjfien'), caption: 'Raw Video Feed' },
      ],
    },
    {
      kind: 'code',
      lang: 'python',
      caption: 'TouchDesigner — channel router (excerpt)',
      body: `import random
def onOffToOn(channel, sampleIndex, val, prev):
\t
\t#shorthands
\tswitchVideo = op('switch1')
\tswitchData = op('switch2')
\tcrossAudio = op('cross1')
\tprevIndex = op('prevIndex').par.const0value
\tbufferSize = int(op('bufferSize').par.const0value)
\t
\t#get or initialize history list
\tstoreRoot = op('base1')
\ttry:
\t\trecent = storeRoot.fetch('recentIndexes')
\texcept:
\t\trecent = []
\t
\t#get valid new indexes
\ttotalInputs = len(switchVideo.inputs)
\tvalidIndexes = [i for i in range(totalInputs) if i not in recent]

\tif not validIndexes:
\t\trecent = []
\t\tvalidIndexes = list(range(totalInputs))
\t#pause previous movie
\top('movie' + str(int((prevIndex)))).par.Onoff = 0
\top('movie' + str(int((prevIndex)))).par.Pulsevideo.pulse()
\t
\t#pick new index
\tindex = random.choice(validIndexes)
\t\t
\t#switch indexes
\tswitchVideo.par.index = index
\tcrossAudio.par.cross = index
\tswitchData.par.index = index
\t
\t#trigger new movie and effect
\top('movie' + str(index)).par.Pulsevideo.pulse()
\top('movie' + str(index)).par.Onoff = 1
\top('tvEffect').par.Trigger.pulse()
\top('prevIndex').par.const0value = index

\trecent.insert(0, index)
\trecent = recent[:int(bufferSize)]
\tstoreRoot.store('recentIndexes', recent)
\tprint(recent)

\t
\treturn`,
    },
    {
      kind: 'credits',
      rows: [
        { label: 'Commissioned by', value: '//PIXELMOUTH' },
        { label: 'Venue', value: 'La MaMa Galleria, NYC' },
        { label: 'Date', value: 'April 5th, 2025' },
        { label: 'Sound', value: 'Cable broadcast, unaltered' },
        { label: 'Thanks', value: 'Tench Cholnoky, Alice Kazal, Tao Liu' },
      ],
    },
  ],
  links: [
    { label: '//PIXELMOUTH show page', href: 'https://pixelmouth.org/eow-1' },
  ],
}
