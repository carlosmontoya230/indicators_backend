import {
  BadRequestException,
  Injectable,
  NotFoundException
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Parser } from "json2csv";
import * as ExcelJS from "exceljs";

import { IndicadorRepresentVisualDto } from "./dto/indicadorRepresenVisual.dto";
import { Indicador } from "./entities/indicator.entity";
import { TipoIndicador } from "./entities/typeIndicator.entity";
import {
  CreateResultadoIndicadorDto,
  CreateSentidoDto,
  CreateTypeIndicatorDto,
  UpdateTypeIndicatorDto
} from "./dto/indicators.dto";
import { ResultadoIndicador } from "./entities/resultsIndicator.entity";
import { Sentido } from "./entities/meaning.entity";

@Injectable()
export class IndicatorsService {
  constructor(
    @InjectRepository(Indicador)
    private readonly indicadorRepository: Repository<Indicador>,
    @InjectRepository(TipoIndicador)
    private readonly tipoIndicadorRepository: Repository<TipoIndicador>,
    @InjectRepository(ResultadoIndicador)
    private readonly resultadoRepository: Repository<ResultadoIndicador>,
    @InjectRepository(Sentido)
    private readonly sentidoRepository: Repository<Sentido>
  ) {}

  async findAll(): Promise<Indicador[]> {
    return this.indicadorRepository.find();
  }

  //* EJercicios de consulta de indicadores
  //1
  async findIndicatorsList(): Promise<any[]> {
    return this.indicadorRepository.find({
      relations: ["tipoIndicador", "sentido", "unidadMedicion"]
    });
  }

  //2
  async findIndicatorWithRepresentVisual(): Promise<
    IndicadorRepresentVisualDto[]
  > {
    const indicadores = await this.indicadorRepository.find({
      select: ["id", "nombre", "codigo", "objetivo", "formula", "meta"],
      relations: [
        "representVisualPorIndicador",
        "representVisualPorIndicador.represenVisual"
      ]
    });
    console.log("🚀 ~ IndicatorsService ~ indicadores:", indicadores);
    return indicadores.map((indicador) => ({
      id: indicador.id,
      nombre: indicador.nombre,
      codigo: indicador.codigo,
      objetivo: indicador.objetivo,
      formula: indicador.formula,
      meta: indicador.meta,
      representVisual: indicador.representVisualPorIndicador.map(
        (rvi) => rvi.represenVisual?.nombre
      )
    }));
  }

  // 3
  async findIndicatorsWithResponsables(): Promise<any[]> {
    const indicadores = await this.indicadorRepository.find({
      select: ["id", "nombre", "codigo", "objetivo", "formula", "meta"],
      relations: [
        "responsablesPorIndicador",
        "responsablesPorIndicador.responsable",
        "responsablesPorIndicador.responsable.tipoActor"
      ]
    });

    return indicadores.map((indicador) => ({
      id: indicador.id,
      nombre: indicador.nombre,
      codigo: indicador.codigo,
      objetivo: indicador.objetivo,
      formula: indicador.formula,
      meta: indicador.meta,
      responsables: indicador.responsablesPorIndicador.map((rpi) => ({
        nombre: rpi.responsable?.nombre,
        tipoActor: rpi.responsable?.tipoActor?.nombre
      }))
    }));
  }

  //4
  async findIndicatorsWithFuentes(): Promise<any[]> {
    const indicadores = await this.indicadorRepository.find({
      select: ["id", "nombre", "codigo", "objetivo", "formula", "meta"],
      relations: ["fuentesPorIndicador", "fuentesPorIndicador.fuente"]
    });

    return indicadores.map((indicador) => ({
      id: indicador.id,
      nombre: indicador.nombre,
      codigo: indicador.codigo,
      objetivo: indicador.objetivo,
      formula: indicador.formula,
      meta: indicador.meta,
      fuentes: indicador.fuentesPorIndicador.map((fpi) => fpi.fuente?.nombre)
    }));
  }

  //5
  async findIndicatorsWithVariables(): Promise<any[]> {
    const indicadores = await this.indicadorRepository.find({
      select: ["id", "nombre", "codigo", "objetivo", "formula", "meta"],
      relations: ["variablesPorIndicador", "variablesPorIndicador.variable"]
    });

    return indicadores.map((indicador) => ({
      id: indicador.id,
      nombre: indicador.nombre,
      codigo: indicador.codigo,
      objetivo: indicador.objetivo,
      formula: indicador.formula,
      meta: indicador.meta,
      variables: indicador.variablesPorIndicador.map((vpi) => ({
        nombre: vpi.variable?.nombre,
        dato: vpi.dato,
        fechadato: vpi.fechadato
      }))
    }));
  }

  //6
  async findIndicatorsWithResultados(): Promise<any[]> {
    const indicadores = await this.indicadorRepository.find({
      select: ["id", "nombre", "codigo", "objetivo", "formula", "meta"],
      relations: ["resultadosIndicador"]
    });

    return indicadores.map((indicador) => ({
      id: indicador.id,
      nombre: indicador.nombre,
      codigo: indicador.codigo,
      objetivo: indicador.objetivo,
      formula: indicador.formula,
      meta: indicador.meta,
      resultados: indicador.resultadosIndicador.map((ri) => ({
        id: ri.id,
        resultado: ri.resultado,
        fechacalculo: ri.fechacalculo
      }))
    }));
  }

  //7
  async exportAllIndicatorsToCSV(): Promise<string> {
    const indicadores = await this.indicadorRepository.find({
      relations: [
        "tipoIndicador",
        "sentido",
        "unidadMedicion",
        "responsablesPorIndicador",
        "responsablesPorIndicador.responsable",
        "responsablesPorIndicador.responsable.tipoActor",
        "fuentesPorIndicador",
        "fuentesPorIndicador.fuente",
        "variablesPorIndicador",
        "variablesPorIndicador.variable",
        "resultadosIndicador",
        "representVisualPorIndicador",
        "representVisualPorIndicador.represenVisual"
      ]
    });

    // Aplana los datos según tus necesidades
    const data = indicadores.map((indicador) => ({
      ...indicador,
      tipoIndicador: indicador.tipoIndicador?.nombre,
      sentido: indicador.sentido?.nombre,
      unidadMedicion: indicador.unidadMedicion?.descripcion,
      responsables: indicador.responsablesPorIndicador
        ?.map((r) => r.responsable?.nombre)
        .join("; "),
      tipoActor: indicador.responsablesPorIndicador
        ?.map((r) => r.responsable?.tipoActor?.nombre)
        .join("; "),
      fuentes: indicador.fuentesPorIndicador
        ?.map((f) => f.fuente?.nombre)
        .join("; "),
      variables: indicador.variablesPorIndicador
        ?.map((v) => v.variable?.nombre)
        .join("; "),
      datosVariables: indicador.variablesPorIndicador
        ?.map((v) => v.dato)
        .join("; "),
      fechasVariables: indicador.variablesPorIndicador
        ?.map((v) => v.fechadato)
        .join("; "),
      resultados: indicador.resultadosIndicador
        ?.map((r) => r.resultado)
        .join("; "),
      fechasResultados: indicador.resultadosIndicador
        ?.map((r) => r.fechacalculo)
        .join("; "),
      representVisual: indicador.representVisualPorIndicador
        ?.map((rv) => rv.represenVisual?.nombre)
        .join("; ")
    }));

    const parser = new Parser();
    return parser.parse(data);
  }

  async exportAllIndicatorsToExcel(): Promise<Buffer> {
    const indicadores = await this.indicadorRepository.find({
      relations: [
        "tipoIndicador",
        "sentido",
        "unidadMedicion",
        "responsablesPorIndicador",
        "responsablesPorIndicador.responsable",
        "responsablesPorIndicador.responsable.tipoActor",
        "fuentesPorIndicador",
        "fuentesPorIndicador.fuente",
        "variablesPorIndicador",
        "variablesPorIndicador.variable",
        "resultadosIndicador",
        "representVisualPorIndicador",
        "representVisualPorIndicador.represenVisual"
      ]
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Indicadores");

    worksheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Código", key: "codigo", width: 20 },
      { header: "Nombre", key: "nombre", width: 30 },
      { header: "Objetivo", key: "objetivo", width: 40 },
      { header: "Fórmula", key: "formula", width: 30 },
      { header: "Meta", key: "meta", width: 20 },
      { header: "Tipo Indicador", key: "tipoIndicador", width: 20 },
      { header: "Sentido", key: "sentido", width: 20 },
      { header: "Unidad Medición", key: "unidadMedicion", width: 20 },
      { header: "Responsables", key: "responsables", width: 30 },
      { header: "Tipo Actor", key: "tipoActor", width: 20 },
      { header: "Fuentes", key: "fuentes", width: 30 },
      { header: "Variables", key: "variables", width: 30 },
      { header: "Datos Variables", key: "datosVariables", width: 30 },
      { header: "Fechas Variables", key: "fechasVariables", width: 30 },
      { header: "Resultados", key: "resultados", width: 30 },
      { header: "Fechas Resultados", key: "fechasResultados", width: 30 },
      { header: "Represent Visual", key: "representVisual", width: 30 }
    ];

    indicadores.forEach((indicador) => {
      worksheet.addRow({
        id: indicador.id,
        codigo: indicador.codigo,
        nombre: indicador.nombre,
        objetivo: indicador.objetivo,
        formula: indicador.formula,
        meta: indicador.meta,
        tipoIndicador: indicador.tipoIndicador?.nombre,
        sentido: indicador.sentido?.nombre,
        unidadMedicion: indicador.unidadMedicion?.descripcion,
        responsables: indicador.responsablesPorIndicador
          ?.map((r) => r.responsable?.nombre)
          .join("; "),
        tipoActor: indicador.responsablesPorIndicador
          ?.map((r) => r.responsable?.tipoActor?.nombre)
          .join("; "),
        fuentes: indicador.fuentesPorIndicador
          ?.map((f) => f.fuente?.nombre)
          .join("; "),
        variables: indicador.variablesPorIndicador
          ?.map((v) => v.variable?.nombre)
          .join("; "),
        datosVariables: indicador.variablesPorIndicador
          ?.map((v) => v.dato)
          .join("; "),
        fechasVariables: indicador.variablesPorIndicador
          ?.map((v) => v.fechadato?.toISOString().split("T")[0])
          .join("; "),
        resultados: indicador.resultadosIndicador
          ?.map((r) => r.resultado)
          .join("; "),
        fechasResultados: indicador.resultadosIndicador
          ?.map((r) => r.fechacalculo?.toISOString().split("T")[0])
          .join("; "),
        representVisual: indicador.representVisualPorIndicador
          ?.map((rv) => rv.represenVisual?.nombre)
          .join("; ")
      });
    });

    const arrayBuffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(arrayBuffer);
  }

  //*--- Tipo indicador ---//

  async createTypeIndicator(
    dto: CreateTypeIndicatorDto
  ): Promise<TipoIndicador> {
    try {
      const tipo = this.tipoIndicadorRepository.create(dto);
      return await this.tipoIndicadorRepository.save(tipo);
    } catch (error) {
      throw new BadRequestException(`Error creando tipo: ${error.message}`);
    }
  }

  async findOneTypeIndicator(id: number): Promise<TipoIndicador> {
    try {
      const tipo = await this.tipoIndicadorRepository.findOne({
        where: { id }
      });
      if (!tipo) throw new NotFoundException("Tipo de indicador no encontrado");
      return tipo;
    } catch (error) {
      throw new BadRequestException(`Error buscando tipo: ${error.message}`);
    }
  }

  async findAllTypeIndicators(): Promise<TipoIndicador[]> {
    try {
      return await this.tipoIndicadorRepository.find();
    } catch (error) {
      throw new BadRequestException(`Error buscando tipos: ${error.message}`);
    }
  }

  async updateTypeIndicator(
    id: number,
    dto: UpdateTypeIndicatorDto
  ): Promise<TipoIndicador> {
    try {
      await this.tipoIndicadorRepository.update(id, dto);
      return await this.findOneTypeIndicator(id);
    } catch (error) {
      throw new BadRequestException(
        `Error actualizando tipo: ${error.message}`
      );
    }
  }

  async removeTypeIndicator(id: number): Promise<void> {
    try {
      const count = await this.indicadorRepository.count({
        where: { tipoIndicador: { id } }
      });
      if (count > 0) {
        throw new BadRequestException(
          "No se puede eliminar: existen indicadores asociados a este tipo."
        );
      }

      const result = await this.tipoIndicadorRepository.delete(id);
      if (result.affected === 0)
        throw new NotFoundException("Tipo de indicador no encontrado");
    } catch (error) {
      throw new BadRequestException(`Error eliminando tipo: ${error.message}`);
    }
  }

  //* resultados indicador --/
  async createResultadoIndicador(
    dto: CreateResultadoIndicadorDto
  ): Promise<ResultadoIndicador> {
    try {
      const indicador = await this.indicadorRepository.findOne({
        where: { id: dto.fkidindicador }
      });
      if (!indicador) throw new NotFoundException("Indicador no encontrado");
      const resultado = this.resultadoRepository.create(dto);
      resultado.indicador = indicador;
      return await this.resultadoRepository.save(resultado);
    } catch (error) {
      throw new BadRequestException(
        `Error creando resultado: ${error.message}`
      );
    }
  }

  async findAllResultsInicators(): Promise<ResultadoIndicador[]> {
    try {
      return await this.resultadoRepository.find({
        relations: ["indicador"]
      });
    } catch (error) {
      throw new BadRequestException(
        `Error buscando resultados: ${error.message}`
      );
    }
  }

  async findResultIndicatorById(id: number): Promise<ResultadoIndicador> {
    try {
      const result = await this.resultadoRepository.findOne({
        where: { id },
        relations: ["indicador"]
      });
      if (!result) throw new NotFoundException("Resultado no encontrado");
      return result;
    } catch (error) {
      throw new BadRequestException(
        `Error buscando resultado por ID: ${error.message}`
      );
    }
  }

  async updateResultIndicator(
    id: number,
    dto: CreateResultadoIndicadorDto
  ): Promise<ResultadoIndicador> {
    try {
      await this.resultadoRepository.update(id, dto);
      return await this.findResultIndicatorById(id);
    } catch (error) {
      throw new BadRequestException(
        `Error actualizando resultado: ${error.message}`
      );
    }
  }

  async removeResultIndicator(id: number): Promise<void> {
    try {
      const result = await this.resultadoRepository.findOne({
        where: { id },
        relations: ["indicador"]
      });
      if (!result) {
        throw new NotFoundException("Resultado no encontrado");
      }
      if (result.indicador) {
        throw new BadRequestException(
          "No se puede eliminar: el resultado está asociado a un indicador."
        );
      }
      const deleteResult = await this.resultadoRepository.delete(id);
      if (deleteResult.affected === 0) {
        throw new NotFoundException("Resultado no encontrado");
      }
    } catch (error) {
      throw new BadRequestException(
        `Error eliminando resultado: ${error.message}`
      );
    }
  }

  //* --- Sentido --- //

  async createMeaning(dto: CreateSentidoDto) {
    try {
      const sentido = this.sentidoRepository.create(dto);
      return await this.sentidoRepository.save(sentido);
    } catch (error) {
      throw new BadRequestException(`Error creando sentido: ${error.message}`);
    }
  }

  async findAllMeanings(): Promise<Sentido[]> {
    try {
      return await this.sentidoRepository.find();
    } catch (error) {
      throw new BadRequestException(
        `Error buscando sentidos: ${error.message}`
      );
    }
  }

  async findMeaningById(id: number): Promise<Sentido> {
    try {
      const sentido = await this.sentidoRepository.findOne({
        where: { id }
      });
      if (!sentido) throw new NotFoundException("Sentido no encontrado");
      return sentido;
    } catch (error) {
      throw new BadRequestException(
        `Error buscando sentido por ID: ${error.message}`
      );
    }
  }

  async updateMeaning(id: number, dto: CreateSentidoDto): Promise<Sentido> {
    try {
      await this.sentidoRepository.update(id, dto);
      return await this.findMeaningById(id);
    } catch (error) {
      throw new BadRequestException(
        `Error actualizando sentido: ${error.message}`
      );
    }
  }

  async removeMeaning(id: number): Promise<void> {
    try {
      const count = await this.indicadorRepository.count({
        where: { sentido: { id } }
      });
      if (count > 0) {
        throw new BadRequestException(
          "No se puede eliminar: existen indicadores asociados a este sentido."
        );
      }

      const result = await this.sentidoRepository.delete(id);
      if (result.affected === 0)
        throw new NotFoundException("Sentido no encontrado");
    } catch (error) {
      throw new BadRequestException(
        `Error eliminando sentido: ${error.message}`
      );
    }
  }
}
