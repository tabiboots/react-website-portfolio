import { cdn } from '../../lib/cloudinary'

export default {
  slug: 'indulge',
  title: 'indulge.png',
  year: '2026',
  medium: 'Acrylic on Wood Panel',
  dimensions: '30 x 50 inches',
  venue: 'Integrated Design Thesis Show',
  cover: { kind: 'image', src: cdn('q_auto/f_auto/v1779739597/indulge-cover-new_o95emb.jpg'), ratio: '16/9' },
  summary: 'An inversion of creativity and computation.',
  blocks: [
    { kind: 'lede', text: '[Opening statement about the piece]' },
    { kind: 'code', lang: 'GLSL', body: 'out vec4 fragColor;\n' +
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
          '}'}
  ],
}
