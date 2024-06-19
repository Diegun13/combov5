
type comboSet = {
    id: number;
    characterId: number;
    moves: string;
    file: string;
    isTrue: boolean;
    notes: string;
    doesKill: boolean | null;
    startingPercent: number;
  };

export default function ComboCard({combo}: {combo: comboSet}) {
  return (
    <div className="flex flex-col items-center bg-rose-400 rounded-md">
        <div>{combo.moves}</div>
        <div>{combo.startingPercent}</div>
        <div>{combo.file}</div>
        <div>{combo.notes}</div>

    </div>
  )
}
