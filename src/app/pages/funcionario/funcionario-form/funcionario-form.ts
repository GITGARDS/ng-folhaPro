import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatStep, MatStepperModule } from "@angular/material/stepper";

@Component({
  selector: 'app-funcionario-form',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatStep,
    MatStepperModule,
  ],
  template: `
    <button matButton="elevated" (click)="isEditable = !isEditable">
      {{ !isEditable ? 'Enable edit mode' : 'Disable edit mode' }}
    </button>
    <mat-vertical-stepper linear #stepper>
      <mat-step [stepControl]="formDadosPessoais" [editable]="isEditable">
        <form [formGroup]="formDadosPessoais">
          <ng-template matStepLabel>Dados Pessoais </ng-template>

          <div class="row mt-4">
            <div class="col">
              <mat-form-field>
                <input matInput placeholder="Id" formControlName="id" />
              </mat-form-field>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <mat-form-field class="full-width">
                <input matInput placeholder="nome" formControlName="nome" />
                @if (formDadosPessoais.controls['nome'].hasError('required')) {
                  <mat-error>Nome is <strong>required</strong></mat-error>
                }
              </mat-form-field>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <mat-form-field>
                <input matInput placeholder="Cpf" formControlName="cpf" />
                @if (formDadosPessoais.controls['cpf'].hasError('required')) {
                  <mat-error>Cpf is <strong>required</strong></mat-error>
                }
              </mat-form-field>
            </div>

            <div class="col">
              <mat-form-field>
                <input matInput placeholder="dataNascimento" formControlName="dataNascimento" />
                @if (formDadosPessoais.controls['dataNascimento'].hasError('required')) {
                  <mat-error>dataNascimento is <strong>required</strong></mat-error>
                }
              </mat-form-field>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <mat-form-field class="full-width">
                <input matInput placeholder="nomeMae" formControlName="nomeMae" />
                @if (formDadosPessoais.controls['nomeMae'].hasError('required')) {
                  <mat-error>nomeMae is <strong>required</strong></mat-error>
                }
              </mat-form-field>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <mat-form-field>
                <input matInput placeholder="nacionalidade" formControlName="nacionalidade" />
                @if (formDadosPessoais.controls['nacionalidade'].hasError('required')) {
                  <mat-error>nacionalidade is <strong>required</strong></mat-error>
                }
              </mat-form-field>
            </div>
            <div class="col">
              <mat-form-field>
                <input matInput placeholder="naturalidade" formControlName="naturalidade" />
                @if (formDadosPessoais.controls['naturalidade'].hasError('required')) {
                  <mat-error>naturalidade is <strong>required</strong></mat-error>
                }
              </mat-form-field>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <mat-form-field>
                <input matInput placeholder="genero" formControlName="genero" />
                @if (formDadosPessoais.controls['genero'].hasError('required')) {
                  <mat-error>genero is <strong>required</strong></mat-error>
                }
              </mat-form-field>
            </div>
            <div class="col">
              <mat-form-field>
                <input matInput placeholder="racaCor" formControlName="racaCor" />
                @if (formDadosPessoais.controls['racaCor'].hasError('required')) {
                  <mat-error>racaCor is <strong>required</strong></mat-error>
                }
              </mat-form-field>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <mat-form-field>
                <input matInput placeholder="estadoCivil" formControlName="estadoCivil" />
                @if (formDadosPessoais.controls['estadoCivil'].hasError('required')) {
                  <mat-error>estadoCivil is <strong>required</strong></mat-error>
                }
              </mat-form-field>
            </div>
            <div class="col">
              <mat-form-field>
                <input matInput placeholder="ativo" formControlName="ativo" />
                @if (formDadosPessoais.controls['ativo'].hasError('required')) {
                  <mat-error>ativo is <strong>required</strong></mat-error>
                }
              </mat-form-field>
            </div>
          </div>
          <div>
            <button matButton matStepperNext>Next</button>
          </div>
        </form>
      </mat-step>

      <mat-step [stepControl]="formDocumentacao" [editable]="isEditable">
        <form [formGroup]="formDocumentacao">
          <ng-template matStepLabel>Documentação</ng-template>
          <div class="row mt-4">
            <div class="col">
              <mat-form-field>
                <input matInput placeholder="rg" formControlName="rg" />
                @if (formDocumentacao.controls['rg'].hasError('required')) {
                  <mat-error>Rg is <strong>required</strong></mat-error>
                }
              </mat-form-field>
            </div>
            <div class="col">
              <mat-form-field>
                <input matInput placeholder="ctpsDigital" formControlName="ctpsDigital" />
                @if (formDocumentacao.controls['ctpsDigital'].hasError('required')) {
                  <mat-error>ctpsDigital is <strong>required</strong></mat-error>
                }
              </mat-form-field>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <mat-form-field>
                <input matInput placeholder="pisPasep" formControlName="pisPasep" />
                @if (formDocumentacao.controls['pisPasep'].hasError('required')) {
                  <mat-error>pisPasep is <strong>required</strong></mat-error>
                }
              </mat-form-field>
            </div>
            <div class="col">
              <mat-form-field>
                <input matInput placeholder="tituloEleitor" formControlName="tituloEleitor" />
                @if (formDocumentacao.controls['tituloEleitor'].hasError('required')) {
                  <mat-error>tituloEleitor is <strong>required</strong></mat-error>
                }
              </mat-form-field>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <mat-form-field>
                <input
                  matInput
                  placeholder="certificadoReservista"
                  formControlName="certificadoReservista"
                />
                @if (formDocumentacao.controls['certificadoReservista'].hasError('required')) {
                  <mat-error>certificadoReservista is <strong>required</strong></mat-error>
                }
              </mat-form-field>
            </div>
          </div>

          <div>
            <button matButton matStepperPrevious>Back</button>
            <button matButton matStepperNext>Next</button>
          </div>
        </form>
      </mat-step>

      <mat-step [stepControl]="formEndereco" [editable]="isEditable">
        <form [formGroup]="formEndereco">
          <ng-template matStepLabel>Endereço e Contato</ng-template>

          <div class="row mt-4">
            <div class="col">
              <mat-form-field class="full-width">
                <input
                  matInput
                  placeholder="enderecoResidencial"
                  formControlName="enderecoResidencial"
                />
                @if (formEndereco.controls['enderecoResidencial'].hasError('required')) {
                  <mat-error>enderecoResidencial is <strong>required</strong></mat-error>
                }
              </mat-form-field>
            </div>
          </div>

          <div>
            <button matButton matStepperPrevious>Back</button>
            <button matButton matStepperNext>Next</button>
          </div>
        </form>
      </mat-step>
      <mat-step [stepControl]="formDadosContratuais" [editable]="isEditable">
        <form [formGroup]="formDadosContratuais">
          <ng-template matStepLabel>Dados Contratuais e Profissionais</ng-template>

          <div class="row mt-4">
            <div class="col">
              <mat-form-field>
                <input matInput placeholder="dataAdmissao" formControlName="dataAdmissao" />
                @if (formDadosContratuais.controls['dataAdmissao'].hasError('required')) {
                  <mat-error>dataAdmissao is <strong>required</strong></mat-error>
                }
              </mat-form-field>
            </div>
            <div class="col">
              <mat-form-field>
                <input
                  matInput
                  placeholder="cargoFuncaoDesempenhada"
                  formControlName="cargoFuncaoDesempenhada"
                />
                @if (
                  formDadosContratuais.controls['cargoFuncaoDesempenhada'].hasError('required')
                ) {
                  <mat-error>cargoFuncaoDesempenhada is <strong>required</strong></mat-error>
                }
              </mat-form-field>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <mat-form-field>
                <input
                  matInput
                  placeholder="categoriaTrabalhador"
                  formControlName="categoriaTrabalhador"
                />
                @if (formDadosContratuais.controls['categoriaTrabalhador'].hasError('required')) {
                  <mat-error>categoriaTrabalhador is <strong>required</strong></mat-error>
                }
              </mat-form-field>
            </div>
            <div class="col">
              <mat-form-field>
                <input matInput placeholder="tipoContrato" formControlName="tipoContrato" />
                @if (formDadosContratuais.controls['tipoContrato'].hasError('required')) {
                  <mat-error>tipoContrato is <strong>required</strong></mat-error>
                }
              </mat-form-field>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <mat-form-field>
                <input matInput placeholder="jornadaTrabalho" formControlName="jornadaTrabalho" />
                @if (formDadosContratuais.controls['jornadaTrabalho'].hasError('required')) {
                  <mat-error>jornadaTrabalho is <strong>required</strong></mat-error>
                }
              </mat-form-field>
            </div>
            <div class="col">
              <mat-form-field>
                <input matInput placeholder="vinculoSindicato" formControlName="vinculoSindicato" />
                @if (formDadosContratuais.controls['vinculoSindicato'].hasError('required')) {
                  <mat-error>vinculoSindicato is <strong>required</strong></mat-error>
                }
              </mat-form-field>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <mat-form-field>
                <input
                  matInput
                  placeholder="departamentoCentroCusto"
                  formControlName="departamentoCentroCusto"
                />
                @if (
                  formDadosContratuais.controls['departamentoCentroCusto'].hasError('required')
                ) {
                  <mat-error>departamentoCentroCusto is <strong>required</strong></mat-error>
                }
              </mat-form-field>
            </div>
          </div>

          <div>
            <button matButton matStepperPrevious>Back</button>
            <button matButton matStepperNext>Next</button>
          </div>
        </form>
      </mat-step>
      <mat-step [stepControl]="formDadosRemuneracao" [editable]="isEditable">
        <form [formGroup]="formDadosRemuneracao">
          <ng-template matStepLabel>Dados de Remuneração e Bancários</ng-template>

          <div class="row mt-4">
            <div class="col">
              <mat-form-field>
                <input matInput placeholder="salarioBase" formControlName="salarioBase" />
                @if (formDadosRemuneracao.controls['salarioBase'].hasError('required')) {
                  <mat-error>salarioBase is <strong>required</strong></mat-error>
                }
              </mat-form-field>
            </div>
            <div class="col">
              <mat-form-field>
                <input matInput placeholder="tipoConta" formControlName="tipoConta" />
                @if (formDadosRemuneracao.controls['tipoConta'].hasError('required')) {
                  <mat-error>tipoConta is <strong>required</strong></mat-error>
                }
              </mat-form-field>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <mat-form-field>
                <input matInput placeholder="banco" formControlName="banco" />
                @if (formDadosRemuneracao.controls['banco'].hasError('required')) {
                  <mat-error>banco is <strong>required</strong></mat-error>
                }
              </mat-form-field>
            </div>
            <div class="col">
              <mat-form-field>
                <input matInput placeholder="agencia" formControlName="agencia" />
                @if (formDadosRemuneracao.controls['agencia'].hasError('required')) {
                  <mat-error>agencia is <strong>required</strong></mat-error>
                }
              </mat-form-field>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <mat-form-field>
                <input matInput placeholder="conta" formControlName="conta" />
                @if (formDadosRemuneracao.controls['conta'].hasError('required')) {
                  <mat-error>conta is <strong>required</strong></mat-error>
                }
              </mat-form-field>
            </div>
          </div>

          <div>
            <button matButton matStepperPrevious>Back</button>
            <button matButton matStepperNext>Next</button>
          </div>
        </form>
      </mat-step>

      <mat-step [stepControl]="formInformacoesBeneficios" [editable]="isEditable">
        <form [formGroup]="formInformacoesBeneficios">
          <ng-template matStepLabel>Informações de Benefícios e Saúde</ng-template>

          <div class="row mt-4">
            <div class="col">
              <mat-form-field>
                <input matInput placeholder="planoSaude" formControlName="planoSaude" />
                @if (formInformacoesBeneficios.controls['planoSaude'].hasError('required')) {
                  <mat-error>planoSaude is <strong>required</strong></mat-error>
                }
              </mat-form-field>
            </div>
            <div class="col">
              <mat-form-field>
                <input
                  matInput
                  placeholder="planoOdontologico"
                  formControlName="planoOdontologico"
                />
                @if (formInformacoesBeneficios.controls['planoOdontologico'].hasError('required')) {
                  <mat-error>planoOdontologico is <strong>required</strong></mat-error>
                }
              </mat-form-field>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <mat-form-field>
                <input matInput placeholder="valeTransporte" formControlName="valeTransporte" />
                @if (formInformacoesBeneficios.controls['valeTransporte'].hasError('required')) {
                  <mat-error>valeTransporte is <strong>required</strong></mat-error>
                }
              </mat-form-field>
            </div>
            <div class="col">
              <mat-form-field>
                <input matInput placeholder="insalubridade" formControlName="insalubridade" />
                @if (formInformacoesBeneficios.controls['insalubridade'].hasError('required')) {
                  <mat-error>insalubridade is <strong>required</strong></mat-error>
                }
              </mat-form-field>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <mat-form-field>
                <input matInput placeholder="suporteTopPonto" formControlName="suporteTopPonto" />
                @if (formInformacoesBeneficios.controls['suporteTopPonto'].hasError('required')) {
                  <mat-error>suporteTopPonto is <strong>required</strong></mat-error>
                }
              </mat-form-field>
            </div>
          </div>

          <div>
            <button matButton matStepperPrevious>Back</button>
            <button matButton matStepperNext>Next</button>
          </div>
        </form>
      </mat-step>

      <mat-step>
        <ng-template matStepLabel>Done</ng-template>
        <p>You are now done.</p>
        <div>
          <button matButton matStepperPrevious>Back</button>
          <button matButton (click)="stepper.reset()">Reset</button>
          <button matButton="elevated" color="primary" type="submit">Submit</button>
        </div>
      </mat-step>
    </mat-vertical-stepper>
  `,
  styles: `
    .full-width {
      width: 100%;
    }

    .shipping-card {
      min-width: 120px;
      margin: 20px auto;
    }

    .mat-radio-button {
      display: block;
      margin: 5px 0;
    }

    .row {
      display: flex;
      flex-direction: row;
    }

    .col {
      flex: 1;
      margin-right: 20px;
    }

    .col:last-child {
      margin-right: 0;
    }
  `,
})
export class FuncionarioForm {
  readonly dialogRef = inject(MatDialogRef<FuncionarioForm>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  isEditable = false;
  private fb = inject(FormBuilder);

  formDadosPessoais = this.fb.group({
    id: [0],
    nome: [''],
    cpf: [''],
    dataNascimento: [''],
    nomeMae: [''],
    nacionalidade: [''],
    naturalidade: [''],
    genero: [''],
    racaCor: [''],
    estadoCivil: [''],
    ativo: [''],
  });

  formDocumentacao = this.fb.group({
    rg: [''],
    ctpsDigital: [''],
    pisPasep: [''],
    tituloEleitor: [''],
    certificadoReservista: [''],
  });

  formEndereco = this.fb.group({
    enderecoResidencial: [''],
  });

  formDadosContratuais = this.fb.group({
    dataAdmissao: [''],
    cargoFuncaoDesempenhada: [''],
    categoriaTrabalhador: [''],
    tipoContrato: [''],
    jornadaTrabalho: [''],
    vinculoSindicato: [''],
    departamentoCentroCusto: [''],
  });

  formDadosRemuneracao = this.fb.group({
    salarioBase: [''],
    tipoConta: [''],
    banco: [''],
    agencia: [''],
    conta: [''],
  });

  formInformacoesBeneficios = this.fb.group({
    planoSaude: [''],
    planoOdontologico: [''],
    valeTransporte: [''],
    insalubridade: [''],
    suporteTopPonto: [''],
  });

  constructor() {
    if (this.data) {
    }
  }

  onSubmit(): void {
    alert('Thanks!');
  }
}
