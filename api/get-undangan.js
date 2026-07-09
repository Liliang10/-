import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method tidak diizinkan. Gunakan GET.' });
    }

    const { slug } = req.query;

    if (!slug) {
        return res.status(400).json({ success: false, message: 'Parameter slug dibutuhkan.' });
    }

    try {
        const { data, error } = await supabase
            .from('pesanan_undangan')
            .select('*')
            .eq('slug', slug)
            .single();

        if (error || !data) {
            console.error('Undangan tidak ditemukan untuk slug:', slug, error);
            return res.status(404).json({ success: false, message: 'Data undangan tidak ditemukan.' });
        }

        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        
        return res.status(200).json({ success: true, data: data });

    } catch (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
}