"use client"
import ComboCard from '@/components/myUI/ComboCard';
import Modal from '@/components/myUI/Modal';
import { Combo } from 'next/font/google';
import { useParams } from 'next/navigation'
import React from 'react'

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

export default function ComboModal({combos}: {combos : comboSet[]}) {
    let param = useParams().slug
    // console.log(combos, "dirty")
    let cur = combos.filter((combo) => combo.id == Number(param))
  return (
    <div>ComboModal
        {param}
        <ComboCard combo={cur[0]} />
    </div>
  )
}
