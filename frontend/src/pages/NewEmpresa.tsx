import React, {useState}  from 'react';
import Router from 'next/router';
import { setCookie, parseCookies, destroyCookie } from 'nookies'

import { api } from "../services/api";

interface empresasProps {
    empId: number;
    empRazSocial: string;
    empNomFantasia: string;
    empCnpjCpf: string;
    empContato: string;
    empFonContato: string;
    empEmail: string;
    empLink: string;
    empStatus: string;
}

const NewEmpresa = () => {
    const [empId, setEmpId] = useState('');
    const [empRazSocial, setEmpRazSocial] = useState('');
    const [empNomFantasia, setEmpNomFantasia] = useState('');
    const [empCnpjCpf, setEmpCnpjCpf] = useState('');
    const [empContato, setEmpContato] = useState('');
    const [empFonContato, setEmpFonContato] = useState('');
    const [empEmail, setEmpEmail] = useState('');
    const [empLink, setEmpLink] = useState('');
    const [empStatus, setEmpStatus] = useState('');
  
    const { 'nextauth.token': token } = parseCookies();
    const { 'nextauth.refreshToken': refreshToken } = parseCookies();
    const { 'nextauth.usrId': idUsr } = parseCookies();
    const { 'nextauth.usrNome': nomUsr } = parseCookies();
    const { 'nextauth.usrNivAcesso': nivAcesso } = parseCookies();

    async function handleCadastra(e:any){      
        e.preventDefault();

        api({
            method: 'post',    
            url: `newempresa`,
            data: {
                empRazSocial,
                empNomFantasia,
                empCnpjCpf,
                empContato,
                empFonContato,
                empEmail,
                empLink,
                empStatus,
            },
            headers: {
                "x-access-token" : token    
            },      
        }).then(function(response) {
            alert('empresa cadastrada com sucesso!')
        }).catch(function(error) {
            handleRefreshToken()          
        })
    }

    async function handleRefreshToken(){
      await api({
          method: 'post',    
          url: `refreshToken`,
          data: {
              idUsr,                            
          },
          headers: {
              "x-access-token" : refreshToken    
          },      
      }).then(function(response) {
          destroyCookie({}, 'nextauth.token');
          destroyCookie({}, 'nextauth.usrId');
          destroyCookie({}, 'nextauth.usrNome');
          destroyCookie({}, 'nextauth.usrNivAcesso');
          destroyCookie({}, 'nextauth.refreshToken'); 
          
          setCookie(undefined, 'nextauth.token', response.data.token, {maxAge: 60 * 60 * 1, })
          setCookie(undefined, 'nextauth.refreshToken', response.data.refreshToken, {maxAge: 60 * 60 * 1, })
          setCookie(undefined, 'nextauth.usrId', response.data.user.usrId, {maxAge: 60 * 60 * 1, })
          setCookie(undefined, 'nextauth.usrNome', response.data.user.usrNome, {maxAge: 60 * 60 * 1, })
          setCookie(undefined, 'nextauth.usrNivAcesso', response.data.user.usrNivAcesso, {maxAge: 60 * 60 * 1, })                
          handleCadastra
      }).catch(function(error) {
          alert(`Falha no token de cadastro de Empresas`);
          Router.push({
              pathname: '/',        
          })      
      })
    }

    return (
    <section className='h-screen md:h-screen '>
      <div className='w-screen h-20 bg-sky-900 mb-10'>

      </div>
      <form>
  <div className="space-y-12 md:ml-28 md:mr-28">
    <div className="border-b border-gray-900/10 pb-12">
      <h2 className="text-2xl font-semibold leading-7 text-gray-900">Informações da Empresa</h2>      
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-4">
          <label className="block text-sm font-medium leading-6 text-gray-900">Descrição Empresa</label>
          <div className="mt-2">
            <input 
              type="text" 
              name="first-name" 
              id="first-name" 
              autoComplete="given-name" 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
              value={empRazSocial}
              onChange={(e) => {setEmpRazSocial(e.target.value)}}/>
          </div>
          <div className="mt-2">
            <input 
              type="text" 
              name="first-name" 
              id="first-name" 
              autoComplete="given-name" 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
              value={empNomFantasia}
              onChange={(e) => {setEmpNomFantasia(e.target.value)}}/>
          </div>
          <div className="mt-2">
            <input 
              type="text" 
              name="first-name" 
              id="first-name" 
              autoComplete="given-name" 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
              value={empCnpjCpf}
              onChange={(e) => {setEmpCnpjCpf(e.target.value)}}/>
          </div>
          <div className="mt-2">
            <input 
              type="text" 
              name="first-name" 
              id="first-name" 
              autoComplete="given-name" 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
              value={empContato}
              onChange={(e) => {setEmpContato(e.target.value)}}/>
          </div>
          <div className="mt-2">
            <input 
              type="text" 
              name="first-name" 
              id="first-name" 
              autoComplete="given-name" 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
              value={empFonContato}
              onChange={(e) => {setEmpFonContato(e.target.value)}}/>
          </div>
          <div className="mt-2">
            <input 
              type="text" 
              name="first-name" 
              id="first-name" 
              autoComplete="given-name" 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
              value={empEmail}
              onChange={(e) => {setEmpEmail(e.target.value)}}/>
          </div>
          <div className="mt-2">
            <input 
              type="text" 
              name="first-name" 
              id="first-name" 
              autoComplete="given-name" 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
              value={empLink}
              onChange={(e) => {setEmpLink(e.target.value)}}/>
          </div>
        </div>        
      </div>
    </div>    
  </div>
  <div className="ml-28 mr-28 mt-6 flex items-center justify-end gap-x-6">
    <button 
      type='button'
      onClick={handleCadastra}
      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
      Salvar
    </button>
  </div>
</form>
    </section>
    );
};
export default NewEmpresa;