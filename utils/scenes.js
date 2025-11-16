export function showScene(id) {
    document.querySelectorAll('.scene').forEach(element => element.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
}