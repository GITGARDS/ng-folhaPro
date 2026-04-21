import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatError, MatFormField, MatInput, MatLabel } from "@angular/material/input";
import { MatTabsModule } from "@angular/material/tabs";

/**
 * @title Dialog with header, scrollable content and actions
 */
@Component({
  selector: 'app-funcionario-form',
  imports: [
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatError,
    MatTabsModule,
    MatLabel,
  ],
  template: `
    <h2 mat-dialog-title>{{ dataForm.value.id ? 'Novo' : 'Alterar' }} Funcionario</h2>
    <mat-dialog-content class="mat-typography">
      <form [formGroup]="dataForm">
        <mat-tab-group animationDuration="500ms" mat-stretch-tabs="false" mat-align-tabs="start">
          <mat-tab label="Dados Pessoais">
            <div class="mt-2">
              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-2" [appearance]="formAparence">
                  <mat-label>Id</mat-label>
                  <input matInput formControlName="id" />
                </mat-form-field>
              </div>

              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-6" [appearance]="formAparence">
                  <mat-label>Nome</mat-label>
                  <input matInput formControlName="nome" />
                  @if (dataForm.controls['nome'].hasError('required')) {
                    <mat-error>Nome is <strong>required</strong></mat-error>
                  }
                </mat-form-field>
              </div>

              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-3" [appearance]="formAparence">
                  <mat-label>CPF</mat-label>
                  <input matInput formControlName="cpf" />
                  @if (dataForm.controls['cpf'].hasError('required')) {
                    <mat-error>Cpf is <strong>required</strong></mat-error>
                  }
                </mat-form-field>
                <mat-form-field class="col-span-3" [appearance]="formAparence">
                  <mat-label>Data Nascimento</mat-label>
                  <input matInput formControlName="dataNascimento" />
                  @if (dataForm.controls['dataNascimento'].hasError('required')) {
                    <mat-error>dataNascimento is <strong>required</strong></mat-error>
                  }
                </mat-form-field>
              </div>

              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-6" [appearance]="formAparence">
                  <mat-label>Nome Mae</mat-label>
                  <input matInput formControlName="nomeMae" />
                  @if (dataForm.controls['nomeMae'].hasError('required')) {
                    <mat-error>nomeMae is <strong>required</strong></mat-error>
                  }
                </mat-form-field>
              </div>

              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-2" [appearance]="formAparence">
                  <mat-label>Nacionalidade</mat-label>
                  <input matInput formControlName="nacionalidade" />
                  @if (dataForm.controls['nacionalidade'].hasError('required')) {
                    <mat-error>nacionalidade is <strong>required</strong></mat-error>
                  }
                </mat-form-field>

                <mat-form-field class="col-span-2" [appearance]="formAparence">
                  <mat-label>Naturalidade</mat-label>
                  <input matInput formControlName="naturalidade" />
                  @if (dataForm.controls['naturalidade'].hasError('required')) {
                    <mat-error>naturalidade is <strong>required</strong></mat-error>
                  }
                </mat-form-field>

                <mat-form-field class="col-span-2" [appearance]="formAparence">
                  <mat-label>Genero</mat-label>
                  <input matInput formControlName="genero" />
                  @if (dataForm.controls['genero'].hasError('required')) {
                    <mat-error>genero is <strong>required</strong></mat-error>
                  }
                </mat-form-field>
              </div>

              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-2" [appearance]="formAparence">
                  <mat-label>Raca Cor</mat-label>
                  <input matInput formControlName="racaCor" />
                  @if (dataForm.controls['racaCor'].hasError('required')) {
                    <mat-error>racaCor is <strong>required</strong></mat-error>
                  }
                </mat-form-field>

                <mat-form-field class="col-span-2" [appearance]="formAparence">
                  <mat-label>Estado Civil</mat-label>
                  <input matInput formControlName="estadoCivil" />
                  @if (dataForm.controls['estadoCivil'].hasError('required')) {
                    <mat-error>estadoCivil is <strong>required</strong></mat-error>
                  }
                </mat-form-field>
                <mat-form-field class="col-span-2" [appearance]="formAparence">
                  <mat-label>Ativo</mat-label>
                  <input matInput formControlName="ativo" />
                  @if (dataForm.controls['ativo'].hasError('required')) {
                    <mat-error>ativo is <strong>required</strong></mat-error>
                  }
                </mat-form-field>
              </div>
            </div>
          </mat-tab>

          <mat-tab label="Documentação">
            <div class="mt-2">
              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-2" [appearance]="formAparence">
                  <mat-label>Rg</mat-label>
                  <input matInput formControlName="rg" />
                  @if (dataForm.controls['rg'].hasError('required')) {
                    <mat-error>Rg is <strong>required</strong></mat-error>
                  }
                </mat-form-field>
                <mat-form-field class="col-span-2" [appearance]="formAparence">
                  <mat-label>Ctps</mat-label>
                  <input matInput formControlName="ctpsDigital" />
                  @if (dataForm.controls['ctpsDigital'].hasError('required')) {
                    <mat-error>ctpsDigital is <strong>required</strong></mat-error>
                  }
                </mat-form-field>
                <mat-form-field class="col-span-2" [appearance]="formAparence">
                  <mat-label>Pis/Pasep</mat-label>
                  <input matInput formControlName="pisPasep" />
                  @if (dataForm.controls['pisPasep'].hasError('required')) {
                    <mat-error>pisPasep is <strong>required</strong></mat-error>
                  }
                </mat-form-field>
              </div>

              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-2" [appearance]="formAparence">
                  <mat-label>Titulo Eleitor</mat-label>
                  <input matInput formControlName="tituloEleitor" />
                  @if (dataForm.controls['tituloEleitor'].hasError('required')) {
                    <mat-error>tituloEleitor is <strong>required</strong></mat-error>
                  }
                </mat-form-field>

                <mat-form-field class="col-span-2" [appearance]="formAparence">
                  <mat-label>Reservista</mat-label>
                  <input matInput formControlName="certificadoReservista" />
                  @if (dataForm.controls['certificadoReservista'].hasError('required')) {
                    <mat-error>certificadoReservista is <strong>required</strong></mat-error>
                  }
                </mat-form-field>
              </div>
            </div>
          </mat-tab>

          <mat-tab label="Endereço e Contato">
            <div class="mt-2">
              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-6" [appearance]="formAparence">
                  <mat-label>Endereço Residencial</mat-label>
                  <input matInput formControlName="enderecoResidencial" />
                  @if (dataForm.controls['enderecoResidencial'].hasError('required')) {
                    <mat-error>enderecoResidencial is <strong>required</strong></mat-error>
                  }
                </mat-form-field>
              </div>
            </div>
          </mat-tab>

          <mat-tab label="Dados Contratuais e Profissionais">
            <div class="mt-2">
              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-2" [appearance]="formAparence">
                  <mat-label>Data Admissão</mat-label>
                  <input matInput formControlName="dataAdmissao" />
                  @if (dataForm.controls['dataAdmissao'].hasError('required')) {
                    <mat-error>dataAdmissao is <strong>required</strong></mat-error>
                  }
                </mat-form-field>
              </div>

              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-2" [appearance]="formAparence">
                  <mat-label>Cargo/Função Desempenhada</mat-label>
                  <input matInput formControlName="cargoFuncaoDesempenhada" />
                  @if (dataForm.controls['cargoFuncaoDesempenhada'].hasError('required')) {
                    <mat-error>cargoFuncaoDesempenhada is <strong>required</strong></mat-error>
                  }
                </mat-form-field>

                <mat-form-field class="col-span-2" [appearance]="formAparence">
                  <mat-label>Categoria Trabalhador</mat-label>
                  <input matInput formControlName="categoriaTrabalhador" />
                  @if (dataForm.controls['categoriaTrabalhador'].hasError('required')) {
                    <mat-error>categoriaTrabalhador is <strong>required</strong></mat-error>
                  }
                </mat-form-field>

                <mat-form-field class="col-span-2" [appearance]="formAparence">
                  <mat-label>Tipo Contrato</mat-label>
                  <input matInput formControlName="tipoContrato" />
                  @if (dataForm.controls['tipoContrato'].hasError('required')) {
                    <mat-error>tipoContrato is <strong>required</strong></mat-error>
                  }
                </mat-form-field>
              </div>

              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-2" [appearance]="formAparence">
                  <mat-label>Jornada de Trabalho</mat-label>
                  <input matInput formControlName="jornadaTrabalho" />
                  @if (dataForm.controls['jornadaTrabalho'].hasError('required')) {
                    <mat-error>jornadaTrabalho is <strong>required</strong></mat-error>
                  }
                </mat-form-field>
                <mat-form-field class="col-span-2" [appearance]="formAparence">
                  <mat-label>Vinculo Sindicato</mat-label>
                  <input matInput formControlName="vinculoSindicato" />
                  @if (dataForm.controls['vinculoSindicato'].hasError('required')) {
                    <mat-error>vinculoSindicato is <strong>required</strong></mat-error>
                  }
                </mat-form-field>
                <mat-form-field class="col-span-2" [appearance]="formAparence">
                  <mat-label>Departamento/Centro de Custo</mat-label>
                  <input matInput formControlName="departamentoCentroCusto" />
                  @if (dataForm.controls['departamentoCentroCusto'].hasError('required')) {
                    <mat-error>departamentoCentroCusto is <strong>required</strong></mat-error>
                  }
                </mat-form-field>
              </div>
            </div>
          </mat-tab>

          <mat-tab label="Dados de Remuneração e Bancários">
            <div class="mt-2">
              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-2" [appearance]="formAparence">
                  <mat-label>Salário Base</mat-label>
                  <input matInput formControlName="salarioBase" />
                  @if (dataForm.controls['salarioBase'].hasError('required')) {
                    <mat-error>salarioBase is <strong>required</strong></mat-error>
                  }
                </mat-form-field>
              </div>

              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-1" [appearance]="formAparence">
                  <mat-label>Tipo Conta</mat-label>
                  <input matInput formControlName="tipoConta" />
                  @if (dataForm.controls['tipoConta'].hasError('required')) {
                    <mat-error>tipoConta is <strong>required</strong></mat-error>
                  }
                </mat-form-field>
                <mat-form-field class="col-span-1" [appearance]="formAparence">
                  <mat-label>Tipo Banco</mat-label>
                  <input matInput formControlName="banco" />
                  @if (dataForm.controls['banco'].hasError('required')) {
                    <mat-error>banco is <strong>required</strong></mat-error>
                  }
                </mat-form-field>
                <mat-form-field class="col-span-1" [appearance]="formAparence">
                  <mat-label>Agência</mat-label>
                  <input matInput formControlName="agencia" />
                  @if (dataForm.controls['agencia'].hasError('required')) {
                    <mat-error>agencia is <strong>required</strong></mat-error>
                  }
                </mat-form-field>
                <mat-form-field class="col-span-3" [appearance]="formAparence">
                  <mat-label>Conta</mat-label>
                  <input matInput formControlName="conta" />
                  @if (dataForm.controls['conta'].hasError('required')) {
                    <mat-error>conta is <strong>required</strong></mat-error>
                  }
                </mat-form-field>
              </div>
            </div>
          </mat-tab>

          <mat-tab label="Informações de Benefícios e Saúde">
            <div class="mt-2">
              <div class="grid grid-cols-6 gap-2">
                <mat-form-field class="col-span-2" [appearance]="formAparence">
                  <mat-label>Plano de Saude</mat-label>
                  <input matInput formControlName="planoSaude" />
                  @if (dataForm.controls['planoSaude'].hasError('required')) {
                    <mat-error>planoSaude is <strong>required</strong></mat-error>
                  }
                </mat-form-field>
                <mat-form-field class="col-span-2" [appearance]="formAparence">
                  <mat-label>Plano Odontológico</mat-label>
                  <input matInput formControlName="planoOdontologico" />
                  @if (dataForm.controls['planoOdontologico'].hasError('required')) {
                    <mat-error>planoOdontologico is <strong>required</strong></mat-error>
                  }
                </mat-form-field>
                <mat-form-field class="col-span-2" [appearance]="formAparence">
                  <mat-label>Plano de Saude</mat-label>
                  <input matInput formControlName="valeTransporte" />
                  @if (dataForm.controls['valeTransporte'].hasError('required')) {
                    <mat-error>valeTransporte is <strong>required</strong></mat-error>
                  }
                </mat-form-field>
              </div>
            </div>
            <div class="grid grid-cols-6 gap-2">
              <mat-form-field class="col-span-2" [appearance]="formAparence">
                <mat-label>Insalubridade</mat-label>
                <input matInput formControlName="insalubridade" />
                @if (dataForm.controls['insalubridade'].hasError('required')) {
                  <mat-error>insalubridade is <strong>required</strong></mat-error>
                }
              </mat-form-field>
              <mat-form-field class="col-span-2" [appearance]="formAparence">
                <mat-label>Suporte Top Ponto</mat-label>
                <input matInput formControlName="suporteTopPonto" />
                @if (dataForm.controls['suporteTopPonto'].hasError('required')) {
                  <mat-error>suporteTopPonto is <strong>required</strong></mat-error>
                }
              </mat-form-field>
            </div>
          </mat-tab>
        </mat-tab-group>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button matButton mat-dialog-close>Cancel</button>
      <button matButton [disabled]="dataForm.invalid" (click)="onSubmit()">Confirma</button>
    </mat-dialog-actions>
  `,

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FuncionarioForm {
  dialogRef = inject(MatDialogRef<FuncionarioForm>);
  data = inject<any>(MAT_DIALOG_DATA);
  formAparence: any = 'outline';
  formOpcao = signal<string>('');

  ngOnInit() {
    const { funcionario } = this.data;
    this.dataForm.patchValue(funcionario);
    this.dataForm.markAllAsTouched();
    this.dataForm.markAsDirty();
    this.formOpcao.set(funcionario.id ? 'Editar' : 'Novo');
  }

  private fb = inject(FormBuilder);

  dataForm = this.fb.group({
    id: [0],
    nome: ['', Validators.required],
    cpf: [''],
    dataNascimento: ['', Validators.required],
    nomeMae: [''],
    nacionalidade: ['', Validators.required],
    naturalidade: ['', Validators.required],
    genero: [''],
    racaCor: ['', Validators.required],
    estadoCivil: ['', Validators.required],
    ativo: [true],
    rg: [''],
    ctpsDigital: [''],
    pisPasep: [''],
    tituloEleitor: [''],
    certificadoReservista: [''],
    enderecoResidencial: [''],
    dataAdmissao: [''],
    cargoFuncaoDesempenhada: [''],
    categoriaTrabalhador: [''],
    tipoContrato: [''],
    jornadaTrabalho: [''],
    vinculoSindicato: [''],
    departamentoCentroCusto: [''],
    salarioBase: ['', Validators.required],
    tipoConta: [''],
    banco: [''],
    agencia: [''],
    conta: [''],
    planoSaude: [''],
    planoOdontologico: [''],
    valeTransporte: [''],
    insalubridade: [''],
    suporteTopPonto: [''],
  });

  onSubmit() {
    this.dialogRef.close(this.dataForm.value);
  }
}
