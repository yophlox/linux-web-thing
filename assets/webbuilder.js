let linuxOutput = document.getElementById("linuxOutput");
let emulator;

window.addEventListener("load", function() {
    linuxOutput.textContent = "Loading...";
    
    // Initialize v86 emulator
    emulator = new V86Starter({
        wasm_path: "assets/v86.wasm",
        memory_size: 512 * 1024 * 1024,
        vga_memory_size: 2 * 1024 * 1024,
        screen_container: document.getElementById("screen_container"),
        bios: {
            url: "assets/seabios.bin"
        },
        vga_bios: {
            url: "assets/vgabios.bin"
        },
        bzimage: {
            url: "assets/bzImage"
        },
        initrd: {
            url: "assets/rootfs.cpio.gz"
        },
        autostart: true
    });

    emulator.add_listener("download-progress", function(p) {
        if (p.lengthComputable) {
            linuxOutput.textContent = `Loading ${p.file_name} ${Math.round(p.loaded / p.total * 100)}%`;
        }
    });
});