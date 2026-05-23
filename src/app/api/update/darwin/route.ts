import { NextRequest, NextResponse } from 'next/server';

/**
 * Auto-update API for macOS.
 *
 * electron-builder checks this endpoint for updates.
 * Returns the latest DMG/ZIP download URL for the given architecture.
 *
 * Query params:
 *   - version: current app version (e.g. "1.121.1")
 *   - arch: architecture (e.g. "x64", "arm64", or "universal")
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const currentVersion = searchParams.get('version') || '0.0.0';

    const githubResponse = await fetch(
      'https://api.github.com/repos/Razisafir/Real-vibecode/releases/latest',
      {
        headers: {
          Accept: 'application/vnd.github+json',
          'User-Agent': 'RealVibecode-Update-Check',
        },
        next: { revalidate: 300 },
      }
    );

    if (!githubResponse.ok) {
      return NextResponse.json({ message: 'No updates available' }, { status: 204 });
    }

    const release = await githubResponse.json();
    const latestVersion = release.tag_name?.replace(/^v/, '') || '0.0.0';

    if (!isNewerVersion(latestVersion, currentVersion)) {
      return NextResponse.json({ message: 'No updates available' }, { status: 204 });
    }

    const zipAsset = release.assets?.find(
      (a: { name: string }) =>
        a.name.includes('mac') && a.name.endsWith('.zip')
    );
    const dmgAsset = release.assets?.find(
      (a: { name: string }) =>
        a.name.includes('mac') && a.name.endsWith('.dmg')
    );

    if (!zipAsset && !dmgAsset) {
      return NextResponse.json({ message: 'No matching download found' }, { status: 204 });
    }

    return NextResponse.json({
      version: latestVersion,
      releaseDate: release.published_at,
      releaseName: release.name,
      releaseNotes: release.body,
      url: (zipAsset || dmgAsset).browser_download_url,
      dmgUrl: dmgAsset?.browser_download_url || null,
    });
  } catch (error) {
    console.error('macOS update check failed:', error);
    return NextResponse.json({ error: 'Update check failed' }, { status: 500 });
  }
}

function isNewerVersion(newer: string, current: string): boolean {
  const parseVersion = (v: string) =>
    v.split('.').map((n) => parseInt(n, 10) || 0);
  const newerParts = parseVersion(newer);
  const currentParts = parseVersion(current);
  for (let i = 0; i < Math.max(newerParts.length, currentParts.length); i++) {
    const n = newerParts[i] || 0;
    const c = currentParts[i] || 0;
    if (n > c) return true;
    if (n < c) return false;
  }
  return false;
}
