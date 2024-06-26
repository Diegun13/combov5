
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
    <div className="flex flex-col h-25 w-80 my-5 text-center items-center overflow-hidden bg-UFD-Char-bg rounded-md border">
        <div>Moves: {combo.moves}</div>
        <div>Is True: {combo.isTrue}</div>
        <div>Percent:: {combo.startingPercent}</div>
        <div><video
      className="h-56 w-96"
        loop
        autoPlay
        muted
        src={combo.file}
      /></div>
        <div>Notes: {combo.notes}</div>

    </div>
  )
}
