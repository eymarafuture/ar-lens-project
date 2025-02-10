$input v_texcoord0

#include "common.sh"

uniform vec4 u_color;
SAMPLER2D(s_texColor, 0);

void main()
{
	vec4 color = toLinear(texture2D(s_texColor, v_texcoord0));
	color.rgb *= color.a;
	gl_FragColor = vec4(toGamma(color.rgb * toLinear(u_color.rgb)), color.a * u_color.a);
}
