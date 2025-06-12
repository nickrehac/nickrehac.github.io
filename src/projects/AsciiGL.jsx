import styles from "./ProjectPages.module.css"

import fishAnimatedReres from "../assets/fishAnimatedReres.gif"
import fishAnimated from "../assets/fishAnimated.gif"
import fragAndVert from "../assets/FragAndVert.png"
import pixelAndVertInfo from "../assets/PixelAndVertInfo.png"
import clientVertexShader from "../assets/clientVertexShader.png"
import clientFragShader from "../assets/clientFragShader.png"

export default function AsciiGL({devMode}) {
    if(devMode) return <div className={styles.content}>
        <div className={styles.row}>
            <img
                src={fishAnimatedReres}
                alt="GIF showing response to resolution change"
            />
            <p>
                This is a software rasterizer library i wrote in C++. Users of the library are
                able to write their own vertex and fragment shaders in C++. It functions in both windowed terminals and
                TTY, and automatically responds to changes in screen resolution or font size . It depends on the GLM
                library for vertex and matrix manipulation, and ncurses for clean access to the terminal. This write up
                is going to focus on my favorite part of the library, which is what someone using it sees.
            </p>
        </div>

        <div className={styles.row}>
            <p>
                To use the library, users define custom implementations of three virtual base classes:
                VertexInformation, VertexShader, and FragmentShader. VertexInformation contains all important
                information about a given vertex in a triangle, such as its position, normal vector, and texture
                coordinates. Users can extend the base class to include any custom information they need, then override
                its interpolate() method to define how that information changes across the surface of a triangle. The
                VertexShader and FragmentShader classes each define a compute() method, which in the case of
                VertexShader takes a given vertex in the form of VertexInformation, and returns a modified copy
                according to the user's VertexShader definition. The FragmentShader's compute() method takes a fragment,
                also in the VertexInformation format, and returns a Pixel object, which determines what character and
                color to display at that fragment's position.
            </p>
            <img
                src={fragAndVert}
                alt="code showing fragment shader and vertex shader class definitions"
            />
        </div>

        <div className={styles.row}>
            <img
                src={pixelAndVertInfo}
                alt="code showing pixel and vertex information class definitions"
            />
            <p>
                Here's another code snippet showing just how simple the structures the library actually works with can
                be. Simplicity is my favorite part of this project. The rasterization process is
                necessarily a little complex, but it's isolated from the end user. All a client program needs to worry
                about is what to display, where to display it, and how to display it.
            </p>
        </div>

        <div className={styles.row}>
            <p>
                I wrote a sample program which loads a *.gltf file, parses the triangle data, and displays the object
                rotating along the z-axis. This GIF shows a fish I modeled in blender and had the program render.
            </p>
            <img src={fishAnimated} alt="ascii fish"/>
        </div>

        <div className={styles.row}>
        <p>
                As one last example, here are the vertex and fragment shaders i wrote for the spinning fish. As classes,
                they are able to store properties and define helper methods. The vertex shader's rotX, rotY, and rotZ
                members can be modified before rendering, and this is how I make the object spin. Compare this to
                gpu-based rendering, where updating shader constants involves allocating memory, synchronization, and
                assuming your shader will receive and interpret your data properly on the other end.
            </p>
            <img
                src={clientVertexShader}
                alt="code showing pixel and vertex information class definitions"
                style={{flex: "2 0"}}
            />
            <img
                src={clientFragShader}
                alt="code showing pixel and vertex information class definitions"
                style={{flex: "2 0"}}
            />
        </div>
    </div>
    else return <div className={styles.content}>
        <div className={styles.row}>
            <img
                src={fishAnimatedReres}
                alt="GIF showing response to resolution change"
            />
            <p>
                This is a library I wrote in C++ to render 3d graphics to the linux terminal. It responds to changes in
                screen resolution in real time (shown in the nearby GIF), making it compatible with terminal emulators
                like xterm. I designed it to be simple and give developers plenty of control so they can get their work
                to the screen as quickly as possible.
            </p>
        </div>
        <div className={styles.row}>
            <p>
                I wrote a sample program using the library which loads a 3d object file and rotates it in the screen.
                This GIF shows a fish I modeled in blender and had the program render.
            </p>
            <img src={fishAnimated} alt="ascii fish"/>
        </div>
    </div>
}
