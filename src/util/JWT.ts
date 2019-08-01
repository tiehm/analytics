/*
 * Copyright (c) 2018 - Charlie tiehm (admin@tiehm.me)
 * You have no permission to use or replicate any of the code shown in the file.
 */

import * as jwt from 'jsonwebtoken';

/**
 * Generate a JWT
 * @param tokenObject {TokenObject}
 * @param secret {String}
 * @constructor
 * @return {String} Token
 */
export function GenerateToken(tokenObject: TokenObject, secret: string): string {
    return jwt.sign(tokenObject, secret, { expiresIn: '2h' });
}

/**
 * Decode a JWT
 * @param token {String}
 * @param secret {String}
 * @constructor
 * @return {TokenObject}
 */
export function DecodeToken(token: string, secret: string): TokenObject {
    try {
        return jwt.verify(token, secret) as TokenObject;
    } catch (e) {
        return null;
    }
}
