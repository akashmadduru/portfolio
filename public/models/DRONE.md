# Hero drone model

The hero renders a **lightweight procedural drone** by default (built in
`components/three/drone-model.tsx` → `ProceduralDrone`) — no download, a few KB,
60 FPS on mobile. To swap in a real Sketchfab drone, drop an **optimized** file
here and it loads automatically:

```
public/models/drone.glb          ← preferred
public/models/drone/scene.gltf   ← also detected
public/models/drone.gltf
```

The loader (`useResolvedModelUrl`) HEAD-probes those paths and uses whichever
exists; otherwise it shows the procedural drone.

---

## 1. Source a model (Sketchfab)

- Go to https://sketchfab.com/search?type=models and search **`drone`** /
  `quadcopter` / `fpv drone`.
- Filter: **Downloadable** ✓ and a permissive **license** (CC-BY or CC0). Avoid
  "editorial"/"all rights reserved".
- Pick a clean, modern, PBR drone (avoid military/toy/damaged/high-poly). Aim for
  a source file that will land **< 20 MB after optimization**.
- **Attribution:** CC-BY requires crediting the author. Add the credit to the
  site footer or a `/credits` page, and keep the license text.

Download as **glTF** (or **Original** → convert to glb below).

## 2. Optimize (target < 20 MB, mobile-friendly)

Requires Node. Install the tools once:

```bash
npm i -g @gltf-transform/cli gltfpack
```

Full pipeline — prune, dedupe, weld, Draco/Meshopt geometry, KTX2 textures:

```bash
# a) clean + resize textures + KTX2 (Basis) + meshopt, via gltf-transform
gltf-transform optimize input.glb drone.opt.glb \
  --texture-compress ktx2 \
  --texture-size 2048 \
  --compress meshopt \
  --prune --weld --join

# b) (optional) extra meshopt pass with gltfpack
gltfpack -i drone.opt.glb -o drone.glb -cc -tc
```

Notes:
- `--prune` removes unused meshes, cameras, lights, animations, materials.
- `--texture-size 2048` (or 1024) trims resolution where it won't be noticed.
- `-cc` = compress meshes (meshopt), `-tc` = KTX2/Basis textures in gltfpack.
- Verify the result at https://gltf.report (size, draw calls, textures).

Place the final `drone.glb` in this folder.

## 3. Decoders (already handled)

`drei`'s `useGLTF` wires the **DRACO** and **Meshopt** decoders automatically and
uses **KTX2** via the renderer, so meshopt/KTX2-compressed assets load with no
extra setup. If you use Draco specifically and see a decode error, ensure network
access to the drei CDN decoder (default) or self-host it.

## 4. Tune placement

In `components/three/drone-model.tsx`:
- `REST_ROTATION` — resting angle (Y is the scroll-rotated axis).
- `REST_SCALE` — size after auto-normalize (`<Resize>` fits it to ~1 unit first).

Lighting/HDR-style reflections, shadows, tone mapping, and the scroll-driven
Y-rotation all apply to the loaded model automatically.
