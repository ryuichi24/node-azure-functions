import * as crypto from "crypto";

export const generateId = () => crypto.randomUUID();
