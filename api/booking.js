import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method tidak diizinkan. Gunakan POST.' });
    }

    try {
        const dataForm = req.body;

        const slug = `${dataForm.nama_pria}-${dataForm.nama_wanita}`
            .toLowerCase()
            .replace(/[^a-z0-9-]/g, '-')
            .replace(/-+/g, '-');

        const { data, error } = await supabase
            .from('pesanan_undangan')
            .insert([
                {
                    slug: slug,
                    nama_pria: dataForm.nama_pria,
                    nama_wanita: dataForm.nama_wanita,
                    ayah_pria: dataForm.ayah_pria,
                    ibu_pria: dataForm.ibu_pria,
                    ayah_wanita: dataForm.ayah_wanita,
                    ibu_wanita: dataForm.ibu_wanita,
                    tanggal_acara: dataForm.tanggal_acara,
                    waktu_acara: dataForm.waktu_acara,
                    lokasi_acara: dataForm.lokasi_acara,
                    maps_link: dataForm.maps_link,
                    foto_prewedding: dataForm.foto_prewedding || null,
                    no_rekening: dataForm.no_rekening || null
                }
            ])
            .select();

        if (error) throw error;

        return res.status(200).json({ 
            success: true, 
            message: 'Pesanan undangan berhasil disimpan!',
            data: data 
        });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}