import { Marker, Popup } from "react-leaflet";
import { icon_opacity, icon_template, stabilizing_gate_ls_key } from "../globals";
import { useContext, useEffect, useState } from "react";
import { FoundContext } from "../FoundContext";
import L from "leaflet";
import { StabilizingGate } from "../types";
import { convertCoords } from "../coords";
import { handleChecked } from "../util";
import { stabilizing_gates } from "../data/stabilizing_gates";

function grid(): [number, number][] {
    if (true) return [[0, 0]]; // Disable grid for now
    let grid: [number, number][] = [];
    for (let n = -100; n <= 100; n += 10) {
        for (let m = -100; m <= 100; m += 10) {
            console.log(n, m);
            grid.push([n, m]);
        }
    }
    return grid;
}

export function StabilizingGateIcon({
    stabilizing_gate,
    key_name,
}: {
    stabilizing_gate: StabilizingGate,
    key_name: string
}) {
    const { found, setFound } = useContext(FoundContext);
    const [checked, setChecked] = useState(
        found.stabilizing_gates ? found.stabilizing_gates.some((k: string) => k === key_name) : false
    );

    useEffect(() => {
        setChecked(found.stabilizing_gates ? found.stabilizing_gates.some((k: string) => k === key_name) : false);
    }, [found]);

    useEffect(() => {
        if (checked) {
            setFound({
                ...found,
                stabilizing_gates: [...found.stabilizing_gates, key_name],
            });
        } else {
            setFound({
                ...found,
                stabilizing_gates: [...found.stabilizing_gates.filter((item: string) => item !== key_name)]
            });
        }
    }, [checked]);

    const icon = L.icon({
        ...icon_template,
        iconUrl: "/icons/iconMapStabilizerGate.png",
        className: `${checked && icon_opacity}`
    });

    return (
        <>
            {grid().map(([n, m]) => (
                <Marker
                    key={`${key_name}-grid-${n}-${m}`}
                    position={[n, m]}
                    icon={icon}
                >
                </Marker>
            ))}
            <Marker key={key_name} position={convertCoords(stabilizing_gate.position.x, stabilizing_gate.position.y)} icon={icon}>
                <Popup>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center gap-5">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => handleChecked(stabilizing_gate_ls_key, key_name, checked, setChecked)}
                                    className="w-4 h-4"
                                />
                                <h1 className="ml-2 text-xl font-medium">Stabilizing Gate</h1>
                            </div>
                        </div>

                        <hr />

                        <div>
                            <span className="text-md font-bold">Description: </span>
                            <span>{stabilizing_gate.description}</span>
                        </div>
                    </div>
                </Popup>
            </Marker>
        </>
    );
}

export const StabilizingGateIcons = Object.keys(stabilizing_gates).map(key => {
    const gate = stabilizing_gates[key];
    return <StabilizingGateIcon key={key} key_name={key} stabilizing_gate={gate} />;
});
