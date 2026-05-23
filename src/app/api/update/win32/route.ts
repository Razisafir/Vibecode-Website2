import { NextRequest, NextResponse } from 'next/server';

/**
 * Auto-update API for Windows (NSIS).
 *
 * electron-builder checks this endpoint for updates.
 * It expects a response matching the GitHub Releases format.
 *
 * Query params:
 *   - version: current app version (e.g. "1.121.1")
 *   - arch: architecture (e.g. "x64" or "arm64")
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const currentVersion = searchParams.get('version') || '0.0.0';
    const arch = searchParams.get('arch') || 'x64';

    // Fetch the latest release from GitHub
    const githubResponse = await fetch(
      'https://api.github.com/repos/Razisafir/Real-vibecode/releases/latest',
      {
        headers: {
          Accept: 'application/vnd.github+json',
          'User-Agent': 'RealVibecode-Update-Check',
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    if (!githubResponse.ok) {
      // If GitHub API fails, return no update available
      return NextResponse.json({ message: 'No updates available' }, { status: 204 });
    }

    const release = await githubResponse.json();
    const latestVersion = release.tag_name?.replace(/^v/, '') || '0.0.0';

    // Compare versions
    if (!isNewerVersion(latestVersion, currentVersion)) {
      return NextResponse.json({ message: 'No updates available' }, { status: 204 });
    }

    // Find the matching assets
    const exeAsset = release.assets?.find(
      (a: { name: string }) =>
        a.name.includes('Setup') && a.name.includes(arch) && a.name.endsWith('.exe')
    );
    const blockmapAsset = release.assets?.find(
      (a: { name: string }) =>
        a.name.includes(arch) && a.name.endsWith('.blockmap')
    );
    const ymlAsset = release.assets?.find(
      (a: { name: string }) => a.name === 'latest.yml'
    );

    if (!exeAsset) {
      return NextResponse.json({ message: 'No matching installer found' }, { status: 204 });
    }

    // Build the update response
    const updateResponse: Record<string, unknown> = {
      version: latestVersion,
      releaseDate: release.published_at,
      releaseName: release.name,
      releaseNotes: release.body,
      url: exeAsset.browser_download_url,
      sha512: '', // Will be populated from blockmap if available
    };

    if (blockmapAsset) {
      updateResponse.blockMapUrl = blockmapAsset.browser_download_url;
    }

    if (ymlAsset) {
      updateResponse.ymlUrl = ymlAsset.browser_download_url;
    }

    return NextResponse.json(updateResponse);
  } catch (error) {
    console.error('Update check failed:', error);
    return NextResponse.json({ error: 'Update check failed' }, { status: 500 });
  }
}

/**
 * Simple semver comparison.
 * Returns true if `newer` is greater than `current`.
 */
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
