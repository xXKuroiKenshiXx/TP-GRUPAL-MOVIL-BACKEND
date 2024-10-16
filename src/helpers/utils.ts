import { JwtService } from "@nestjs/jwt";

export const extractTokenFromHeader = (request: Request): string | undefined => {
  const [type, token] = request.headers['authorization']?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
}

export const responseStatusMsg = (status: number, msg: string) => {
  return { status, msg }
}


export const getCurrentUserID = async (request: Request) => {
  const token = extractTokenFromHeader(request);
  const payload = await new JwtService().decode(token)
  return payload.sub
}

export const getCurrentUserIDAndRol = async (request: Request) => {
  const token = extractTokenFromHeader(request);
  const payload = await new JwtService().decode(token)
  return { id: payload.sub, rol: payload.rol}
}