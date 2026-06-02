import { cdn, cdnVideo } from '../../lib/cloudinary'

export default {
  slug: 'indulge',
  title: 'indulge.png',
  year: '2026',
  medium: 'Acrylic on Wood Panel, 238 Hours',
  dimensions: '30 x 50 inches',
  venue: 'Integrated Design Thesis Show',
  cover: { kind: 'image', src: cdn('q_auto/f_auto/v1779739597/indulge-cover-new_o95emb.jpg'), ratio: '16/9' },
  summary: 'The impossible pursuit of perfection in the face of algorithms.',
  blocks: [
    { kind: 'lede', text: <>{"A hand-painted recreation of Robert Lyn Nelson's "}
        <a href="https://robertlynnelson.com/product/indulge/" target="_blank" rel="noreferrer" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Indulge</a>
        {`, transformed\nthrough a pixel-sorting algorithm written in GLSL.`}</> },
    { kind: 'essay', body: ['Generative AI threatens the livelihood of creatives by emulating something that used to be singular to humanity-- creativity. As an act of rebellion, ' +
      'I decided to emulate something only a computer should be able to do: ' +
      'algorithmic processing en masse. I made mistakes, I altered colors, and it ' +
      'took an absurd amount of time, but the point of art was never to be able to ' +
      'keep up with algorithms ', 'By undertaking the task of painting 18,000 pixels by hand, I invert the roles ' +
      'between computational and creative: the machine generates the visual logic ' +
      'while the human becomes the executor, faithfully materializing the system\'s ' +
      'decisions. The resulting image sits between painting and computation, ' +
      'questioning where intention, creativity, and authorship truly reside.']},
    {kind : 'image-pair',
      images: [
          {
            kind: 'image',
            src: cdn('/q_auto/f_auto/indulge-process-7_aepcmm.png'),
            caption: 'Indulge by Robert Lyn Nelson.'
          },
          {
          kind: 'image',
          src: cdn('/q_auto/f_auto/indulge-process-05_ce8doh.png'),
          caption: 'Indulge post pixel-sorting.'
          },
      ]
    },
    {kind : 'section', heading: 'Process'},
    {kind : 'essay', body: [<>{'My initial inspiration for this piece was imagining a world where algorithms ' +
      'were able to make art for their own enjoyment instead of being guided ' +
      'by human aesthetic rationality. I explored pixel sorting and compression ' +
      'algorithms and wanted to recreate an image produced by one of these ' +
      'pieces of software as faithfully as I could. I met with New York-based artist '}
      <a href="https://www.carterhodgkin.com/" target="_blank" rel="noreferrer" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Carter Hodgkin</a>
      {', who has been doing this kind of art for decades, to learn ' +
      'about process and materials. I printed my image onto PhotoTex adhesive ' +
      'canvas and stuck it to my 30x50 inch wood panel before beginning to paint ' +
      'each square.'}</>,
        'As I began to pour hours into this painting, it allowed for reflection on what\n' +
      'the piece was about. It mutated through a myriad of interpretations before I\n' +
      'landed on the most resonant answer for why I was doing this. I felt as though\n' +
      'the proliferation of generative AI has stripped my peers and me of our desire\n' +
      'to produce creative work for our careers, so I wanted to strip a computer of a\n' +
      'task that only it should be able to do. This futile endeavour was full of errors\n' +
      'and slight deviations, which has only left me thinking about how chasing the\n' +
      'efficiency and perfection of an algorithm within artistic projects only leaves\n' +
      'pieces without their innate human touch.']},
    {kind: 'image-grid',
    images: [
      {kind: 'image', src: cdn('/q_auto/f_auto/indulge-process-09_gw92ub'), caption: 'Applying my PhotoTex guide to the panel.'},
      {kind: 'video', src: cdnVideo('q_auto/f_auto/06-indulge-process_vjbaoc'), caption: 'Masking and painting individual colors.'},
      {kind: 'image', src: cdn('/q_auto/f_auto/03-indulge-detail_imsz7v'), caption: 'Detail'},
    ]},
    { kind: 'code', lang: 'GLSL', caption: "Pixel-Sorting Algorithm. Written in GLSL and ran in TouchDesigner.", body:
          'out vec4 fragColor;\n' +
          '\n' +
          'uniform vec3 iResolution;\n' +
          'uniform vec4 iMouse;\n' +
          'uniform float iGlobalTime;\n' +
          'uniform int iFrame;\t\n' +
          'uniform bool orientation;\n' +
          '\n' +
          '#define THR ( iMouse.x / iResolution.x )\n' +
          '#define SHADOW true\n' +
          '#define REVERSE false\n' +
          '\n' +
          'float gray( vec3 c ) {\n' +
          '    return dot( c, vec3( 0.299, 0.587, 0.114 ) );\n' +
          '}\n' +
          '\n' +
          'vec3 toRgb( float i ) {\n' +
          '    return vec3(\n' +
          '        mod( i, 256.0 ),\n' +
          '        mod( floor( i / 256.0 ), 256.0 ),\n' +
          '        floor( i / 65536.0 )\n' +
          '    ) / 255.0;\n' +
          '}\n' +
          '\n' +
          'bool thr( float v ) {\n' +
          '    return SHADOW ? ( THR < v ) : ( v < THR );\n' +
          '}\n' +
          '\n' +
          'vec4 draw( vec2 uv ) {\n' +
          '    vec2 dir = orientation ? vec2( 0.0, 1.0 ) : vec2( 1.0, 0.0 );\n' +
          '    float wid = orientation ? iResolution.y : iResolution.x;\n' +
          '    float pos = orientation ? floor( uv.y * iResolution.y ) : floor( uv.x * iResolution.x );\n' +
          '    \n' +
          '    float val = gray( texture( sTD2DInputs[0], uv ).xyz );\n' +
          '    \n' +
          '    if ( !thr( val ) ) {\n' +
          '        float post = pos;\n' +
          '        float rank = 0.0;\n' +
          '        float head = 0.0;\n' +
          '        float tail = 0.0;\n' +
          '        \n' +
          '        for ( int i = 0; i < int( wid ); i ++ ) {\n' +
          '            post -= 1.0;\n' +
          '            if ( post == -1.0 ) { head = post + 1.0; break; }\n' +
          '            vec2 p = dir * ( post + 0.5 ) / wid + dir.yx * uv;\n' +
          '            float v = gray( texture( sTD2DInputs[0], p ).xyz );\n' +
          '            if ( thr( v ) ) { head = post + 1.0; break; }\n' +
          '            if ( v <= val ) { rank += 1.0; }\n' +
          '        }\n' +
          '        \n' +
          '        post = pos;\n' +
          '        for ( int i = 0; i < int( wid ); i ++ ) {\n' +
          '            post += 1.0;\n' +
          '            if ( wid == post ) { tail = post - 1.0; break; }\n' +
          '            vec2 p = dir * ( post + 0.5 ) / wid + dir.yx * uv;\n' +
          '            float v = gray( texture( sTD2DInputs[0], p ).xyz );\n' +
          '            if ( thr( v ) ) { tail = post - 1.0; break; }\n' +
          '            if ( v < val ) { rank += 1.0; }\n' +
          '        }\n' +
          '        \n' +
          '        pos = REVERSE ? ( tail - rank ) : ( head + rank );\n' +
          '    }\n' +
          '    \n' +
          '    return vec4( toRgb( pos ), 1.0 );\n' +
          '}\n' +
          '\n' +
          'void main(  ) {\n' +
          '    fragColor = draw( vUV.st );\n' +
          '}'},
      {kind: 'section', heading: 'Reflection'},
      {kind: 'essay', body: ['This painting was completed after 238 hours of taping and painting. I never ' +
          'expected it to take this long, and as that process dragged on, I thought ' +
          'more and more about the value we place on automation and efficiency ' +
          'surrounding creativity these days. When our goals in art are driven by the ' +
          'market, it makes sense to want to reach for generative AI, but this project ' +
          'has reminded me of the importance of protecting art, and its role in ' +
          'self discovery and expression.', 'The outcome is the least important aspect of this project, no matter how ' +
          'striking I find the visual. All of the importance of this piece stems from the ' +
          'fact that I was kneeling over it for days at a time because I believed it was ' +
          'worth the effort.']},
      {kind: 'credits',
    rows: [
    { label: 'Venue', value: '2 West 13th St' },
    { label: 'Date', value: 'May 15th - May 19th' },
    { label: 'Thanks', value: 'Lacey Blaine, Carter Hodgkin, Laura Nova' },
],
},
  ],
}
