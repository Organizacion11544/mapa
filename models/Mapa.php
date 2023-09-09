<?php

namespace Model;

class Mapa extends ActiveRecord
{
    protected static $tabla = 'coordenadas';
    protected static $columnasDB = ['coor_descr', 'coor_latitud', 'coor_longitud', 'coor_situacion'];
    protected static $idTabla = 'coor_id';

    public $coor_id;
    public $coor_descr;
    public $coor_latitud;
    public $coor_longitud;
    public $coor_situacion;

    public function __construct($args = [])
    {
        $this->coor_id = $args['coor_id'] ?? null;
        $this->coor_descr = $args['coor_descr'] ?? '';
        $this->coor_latitud = $args['coor_latitud'] ?? '';
        $this->coor_longitud = $args['coor_longitud'] ?? '';
        $this->coor_situacion = $args['coor_situacion'] ?? 1;
    }
}
