Physics Collider
This example project shows how to implement physics and colliders in your Web AR experience.

const gltfPhysicsObjectComponent = {
  schema: {
    model: {default: ''},
    body: {type: 'string', default: 'dynamic'},  // dynamic: A freely-moving object
    shape: {type: 'string', default: 'hull'},  // hull: Wraps a model in a convex hull, like a shrink-wrap
  },
  init() {
    const gltfmodel = document.createElement('a-entity')
    this.el.appendChild(gltfmodel)
    gltfmodel.object3D.position.set(0, 0.1, 0)
    gltfmodel.setAttribute('gltf-model', this.data.model)
    gltfmodel.setAttribute('shadow', {receive: false})
    // Specify what type of ammo-body (dynamic, static, kinematic)
    gltfmodel.setAttribute('ammo-body', {type: this.data.body})
    // Waiting for model to load before adding ammo-shape (box, cylinder, sphere, capsule, cone, hull)
    this.el.addEventListener('model-loaded', () => {
      gltfmodel.setAttribute('ammo-shape', {type: this.data.shape})
    })
  },
}
export {gltfPhysicsObjectComponent}