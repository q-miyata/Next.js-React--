import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { socketAtom } from '../atoms';
import io from 'socket.io-client';

//socketioをなんかするカスタムフック
