import { NextResponse } from 'next/server';

/**
 * General update status API.
 * Returns the latest version info for all platforms.
 */
export async function GET() {
  try {
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
      return NextResponse.json(
        { error: 'Failed to fetch release info' },
        { status: 502 }
      );
    }

    const release = await githubResponse.json();
    const version = release.tag_name?.replace(/^v/, '') || '0.0.0';

    // Categorize assets by platform
    const assets: Record<string, string[]> = {
      windows: [],
      macos: [],
      linux: [],
    };

    for (const asset of release.assets || []) {
      const name: string = asset.name;
      const url: string = asset.browser_download_url;
      const size: number = asset.size;

      if (name.endsWith('.exe') || name.endsWith('.blockmap')) {
        assets.windows.push(`${name} (${(size / 1048576).toFixed(1)} MB) → ${url}`);
      } else if (name.endsWith('.dmg') || name.endsWith('.zip') || name.includes('mac')) {
        if (name.endsWith('.yml')) continue;
        assets.macos.push(`${name} (${(size / 1048576).toFixed(1)} MB) → ${url}`);
      } else if (
        name.endsWith('.AppImage') ||
        name.endsWith('.deb') ||
        name.endsWith('.rpm') ||
        name.endsWith('.snap')
      ) {
        assets.linux.push(`${name} (${(size / 1048576).toFixed(1)} MB) → ${url}`);
      }
    }

    return NextResponse.json({
      version,
      releaseDate: release.published_at,
      releaseName: release.name,
      releaseNotes: release.body,
      downloadUrl: release.html_url,
      assets,
    });
  } catch (error) {
    console.error('Update status check failed:', error);
    return NextResponse.json(
      { error: 'Update check failed' },
      { status: 500 }
    );
  }
}
