/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        /*
          The Spline scene is ~460KB and changes only when it is re-exported
          from the editor. A week of caching spares repeat readers the download
          without the hazard of `immutable`: the filename carries no content
          hash, so a year-long immutable entry would strand them on a stale
          scene — and because the component looks objects up by name, a stale
          scene degrades silently rather than failing loudly.
        */
        source: "/assets/:path*.spline",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
