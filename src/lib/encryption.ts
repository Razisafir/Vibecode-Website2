import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'vibecode-default-encryption-key-change-in-production';
const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;

function getKey(): Buffer {
    // Derive a 32-byte key from the encryption key string
    return crypto.createHash('sha256').update(ENCRYPTION_KEY).digest();
}

export function encryptField(text: string): string {
    const key = getKey();
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const tag = cipher.getAuthTag();
    return iv.toString('hex') + ':' + tag.toString('hex') + ':' + encrypted;
}

export function decryptField(encryptedText: string): string {
    try {
        const key = getKey();
        const parts = encryptedText.split(':');
        if (parts.length !== 3) {
            // Not encrypted, return as-is (backward compatibility)
            return encryptedText;
        }
        const iv = Buffer.from(parts[0], 'hex');
        const tag = Buffer.from(parts[1], 'hex');
        const encrypted = parts[2];
        const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
        decipher.setAuthTag(tag);
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    } catch {
        // If decryption fails, return the original text (might be unencrypted legacy data)
        return encryptedText;
    }
}

export function encryptSubmission(data: Record<string, unknown>): Record<string, unknown> {
    const encrypted: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
        if (typeof value === 'string' && value.length > 0) {
            encrypted[key] = encryptField(value);
        } else {
            encrypted[key] = value;
        }
    }
    return encrypted;
}

export function decryptSubmission(data: Record<string, unknown>): Record<string, unknown> {
    const decrypted: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
        if (typeof value === 'string') {
            decrypted[key] = decryptField(value);
        } else {
            decrypted[key] = value;
        }
    }
    return decrypted;
}
